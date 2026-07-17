// POST /api/pay/create-payment-link
// Creates a Stripe Payment Link an invoice can be paid with (card + ACH in test).
//
// Body: { amount, description, matter, connectedAccountId? }
// Returns: { url }
const Stripe = require("stripe");
const { getSupabase } = require("../_supabase");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(500).json({ error: "STRIPE_SECRET_KEY is not set" });
  const stripe = Stripe(key);

  try {
    const { amount, description, matter, client, invoiceId, connectedAccountId } = req.body || {};
    const cents = Math.round(Number(amount) * 100);
    if (!cents || cents < 50) return res.status(400).json({ error: "invalid amount" });

    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: cents,
      product_data: { name: (description || "Court reporting services") + (matter ? " — " + matter : "") },
    });

    const params = {
      line_items: [{ price: price.id, quantity: 1 }],
      payment_method_types: ["card", "us_bank_account"],
      // The webhook uses this to mark the invoice paid.
      metadata: { invoice_id: invoiceId || "" },
      payment_intent_data: { metadata: { invoice_id: invoiceId || "" } },
    };
    // If we know the reporter's connected account, route the funds to them
    // (destination charge). Requires the account to have completed onboarding.
    if (connectedAccountId) {
      params.on_behalf_of = connectedAccountId;
      params.transfer_data = { destination: connectedAccountId };
    }

    const link = await stripe.paymentLinks.create(params);

    // Record the invoice as "sent" with its payment link (no-op without Supabase).
    const supabase = getSupabase();
    if (supabase && invoiceId) {
      await supabase.from("invoices").upsert(
        { id: invoiceId, client: client || null, matter: matter || null, description: description || null,
          amount_cents: cents, status: "sent", stripe_payment_link_id: link.id, stripe_payment_link_url: link.url },
        { onConflict: "id" }
      );
    }

    res.status(200).json({ url: link.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
