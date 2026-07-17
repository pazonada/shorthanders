// GET /api/health — lets the frontend detect whether the Stripe backend is live.
module.exports = (req, res) => {
  res.status(200).json({ ok: true, stripeConfigured: !!process.env.STRIPE_SECRET_KEY });
};
