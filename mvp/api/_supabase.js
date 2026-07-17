// Shared Supabase client for serverless functions (service role — server only).
// Returns null when Supabase isn't configured, so the Stripe scaffold still
// works without a database during early testing.
const { createClient } = require("@supabase/supabase-js");

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

module.exports = { getSupabase };
