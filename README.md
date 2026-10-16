# Moral Mirror — Jev in Two Tellings

A bilingual, interactive trolley-problem lab that compares how Jev responds to closely matched English and Persian versions of the same dilemma. The aim is to make wording effects visible, not to claim that one short run proves how a model behaves in general.

## Status

Project scaffold only. The app, BYOP flow, and live hosting are not built yet.

## Safety

- User requests go to Jev through Pollinations BYOP; the app must never spend the maintainer's balance for visitors.
- Keep user-authorized secret keys in memory (or short-lived sessionStorage only during the OAuth callback handoff). Never put them in localStorage, URLs, analytics, or logs.
- Use mocked fixtures for development. Do not make a live billed model call without the account owner's explicit approval of the exact budget and request scope.
- Label the English/Persian pair as a controlled wording comparison; do not present one response as a scientific benchmark.
