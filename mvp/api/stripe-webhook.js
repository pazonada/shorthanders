// POST /api/stripe-webhook
// Stripe -> us. Verifies the signature, then:
//   account.updated          -> update the reporter's onboarding/payout flags
//   payment_intent.succeeded -> mark the invoice paid (invoice_id in metadata)
//   checkout.session.completed -> fallback for the above
//
// Add the endpoint in Stripe (Developers -> Webhooks -> your Vercel URL +
// /api/stripe-webhook) and set STRIPE_WEBHOOK_SECRET. NOTE: this needs to be
// tested against a live deploy — Vercel's raw-body handling for signature
// verification can't be exercised locally without keys.
const Stripe = require("stripe");
const { getSupabase } = require("./_supabase");

// Stripe signature verification needs the raw, unparsed body.
module.exports.config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(typeof c === "string" ? Buffer.from(c) : c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const key = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !whSecret) return res.status(500).json({ error: "Stripe env not fully configured" });
  const stripe = Stripe(key);

  let event;
  try {
    const raw = await readRawBody(req);
    event = stripe.webhooks.constructEvent(raw, req.headers["stripe-signature"], whSecret);
  } catch (e) {
    return res.status(400).json({ error: "signature verification failed: " + e.message });
  }

  const supabase = getSupabase();
  try {
    if (event.type === "account.updated") {
      const a = event.data.object;
      if (supabase) {
        await supabase.from("reporters")
          .update({
            details_submitted: a.details_submitted,
            charges_enabled: a.charges_enabled,
            payouts_enabled: a.payouts_enabled,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_account_id", a.id);
      }
    } else if (event.type === "payment_intent.succeeded" || event.type === "checkout.session.completed") {
      const obj = event.data.object;
      const invoiceId = (obj.metadata && obj.metadata.invoice_id) || "";
      if (supabase && invoiceId) {
        await supabase.from("invoices")
          .update({ status: "paid", paid_at: new Date().toISOString() })
          .eq("id", invoiceId);
      }
    }
    res.status(200).json({ received: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
