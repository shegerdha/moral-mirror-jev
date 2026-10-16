# Moral Mirror — Jev in Two Tellings

A bilingual trolley-problem experiment. Choose first, rate whether the English and Persian tellings preserve the same meaning, then compare Jev's structured judgment side by side. The result reports the probability, permissibility, and confidence deltas between those two responses. The point is to examine wording; one run is not evidence of a general rule about a model or a language.

## Try it

Serve this folder as static files, then open `index.html` through the local server. The no-cost demo uses fixed illustrative fixtures and makes no API calls. The live comparison requires a Pollinations App Key and a visitor-authorized BYOP key.

Each live comparison sends exactly two requests to `POST https://gen.pollinations.ai/alpha/decisions`: one English and one Persian. Automatic retries are disabled. Jev reports structured probabilities, confidence, and input-token usage. The translation rating is optional, stays in the current page, and is never sent to Jev. The app never uses the maintainer's balance for visitors.

## Configure BYOP

1. Create a Pollinations publishable App Key after the public callback URL is known.
2. Register the exact `callback.html` URL as a redirect URI.
3. Set `clientId` in `app-config.js` to the resulting public `pk_` App Key. Never place an `sk_` secret key in this repository.
4. The OAuth PKCE flow requests only the Jev model, a 1 Pollen cap, and a 1-day lifetime. It does not request profile or account-admin scopes.

The OAuth callback exchanges a short-lived code, removes the code from the address bar, then hands the token back through same-tab `sessionStorage`; the main app immediately removes it and keeps it in memory. Tokens are never stored in localStorage or logged.

## Development and verification

No dependencies or build step are required. Use mocked fixtures for local checks. Never make live billed API requests during development unless the account owner explicitly approves the exact request count and maximum Pollen spend.
