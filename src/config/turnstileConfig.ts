// Cloudflare Turnstile configuration
//
// Production key: used on all HTTPS hostnames (production, staging, local HTTPS dev).
// On HTTP (plain localhost), Turnstile's Private Access Token (PAT) challenges
// require HTTPS and fail with ERR_SSL_PROTOCOL_ERROR, generating invalid tokens.
// Solution: run gatsby develop with HTTPS=true (see package.json "dev:https" script).
//
// Test key: kept as fallback for CI/automated tests only.

const TURNSTILE_PROD_KEY = "0x4AAAAAAB4Bl0NJyxtMOFfz";
// Cloudflare official test key — only for automated/CI use, NOT for manual testing
const TURNSTILE_TEST_KEY = "1x00000000000000000000AA";

// All HTTPS hostnames registered in the Cloudflare Turnstile widget dashboard.
// localhost is included here for HTTPS local dev (gatsby develop with HTTPS=true).
const REGISTERED_HOSTNAMES = [
  "beseen.moonglade.life",
  "www.beseen.moonglade.life",
  "devmoonglade.irarealty.in",
  "moonglade.irarealty.in",
  "moonglade.life",
  "irarealty.in",
  "beseen-moonglade-text.netlify.app",
  "localhost",
  "127.0.0.1",
];

export const getTurnstileSiteKey = (hostname?: string): string => {
  if (hostname && REGISTERED_HOSTNAMES.includes(hostname)) {
    return TURNSTILE_PROD_KEY;
  }
  return TURNSTILE_TEST_KEY;
};

// Not used directly in components — components call getTurnstileSiteKey() at runtime.
export const TURNSTILE_SITE_KEY = TURNSTILE_PROD_KEY;
