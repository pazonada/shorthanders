// POST /api/connect/create-account
// Creates a Stripe Connect Express account for a reporter and returns a hosted
// onboarding URL (Stripe collects identity, tax, and banking — we never see it).
//
// Body: { licenseNumber, name, email }
// Returns: { accountId, url }
const Stripe = require("stripe");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(500).json({ error: "STRIPE_SECRET_KEY is not set" });
  const stripe = Stripe(key);

  try {
    const { licenseNumber, name, email } = req.body || {};
    const origin = req.headers.origin || ("https://" + req.headers.host);

    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: email || undefined,
      business_type: "individual",
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
      business_profile: {
        name: name || undefined,
        product_description: "Certified court reporting services",
      },
      metadata: { csr_license: String(licenseNumber || "") },
    });

    const link = await stripe.accountLinks.create({
      account: account.id,
      // If the reporter bails midway, send them back to their claim page.
      refresh_url: origin + "/#/claim/" + (licenseNumber || ""),
      // On success, land them on their dashboard. NOTE: without a datastore we
      // pass the account id back in the URL — fine for a demo, replace with a DB
      // lookup keyed to the signed-in reporter before going to production.
      return_url: origin + "/#/reporter?stripe=connected&acct=" + account.id,
      type: "account_onboarding",
    });

    res.status(200).json({ accountId: account.id, url: link.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
