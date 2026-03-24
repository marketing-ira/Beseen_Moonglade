// Cloudflare Turnstile configuration
// The production key is registered only for beseen.moonglade.life.
// Any other hostname (localhost, staging, preview deploys) uses Cloudflare's
// official always-passing test key to avoid 110200 / 401 errors.
// See: https://developers.cloudflare.com/turnstile/troubleshooting/testing/

const TURNSTILE_PROD_KEY = "0x4AAAAAAB4Bl0NJyxtMOFfz";
// Cloudflare's official test key — always passes, works on any domain
const TURNSTILE_TEST_KEY = "1x00000000000000000000AA";

// All domains registered in the Cloudflare Turnstile widget dashboard
// AND proxied through Cloudflare (orange cloud) — required for /cdn-cgi/ path.
const REGISTERED_HOSTNAMES = [
  "beseen.moonglade.life",
];

export const getTurnstileSiteKey = (hostname?: string) => {
  if (!hostname) {
    return TURNSTILE_TEST_KEY;
  }

  return REGISTERED_HOSTNAMES.includes(hostname)
    ? TURNSTILE_PROD_KEY
    : TURNSTILE_TEST_KEY;
};

export const TURNSTILE_SITE_KEY = getTurnstileSiteKey(
  typeof window !== "undefined" ? window.location.hostname : undefined
);
