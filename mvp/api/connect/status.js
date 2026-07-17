// GET /api/connect/status?account=acct_xxx
// Returns whether the connected account has finished onboarding.
const Stripe = require("stripe");

module.exports = async (req, res) => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(500).json({ error: "STRIPE_SECRET_KEY is not set" });
  const stripe = Stripe(key);

  const account = req.query.account;
  if (!account) return res.status(400).json({ error: "missing account" });

  try {
    const a = await stripe.accounts.retrieve(account);
    res.status(200).json({
      id: a.id,
      detailsSubmitted: a.details_submitted,
      chargesEnabled: a.charges_enabled,
      payoutsEnabled: a.payouts_enabled,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
