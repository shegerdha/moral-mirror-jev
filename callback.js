const status = document.querySelector("#callback-status");
const returnLink = document.querySelector("#return-link");
const params = new URLSearchParams(location.search);
const code = params.get("code");
const returnedState = params.get("state");
const error = params.get("error");

// Remove the one-time authorization code from the visible URL before handling it.
history.replaceState(null, "", location.pathname);

async function finishAuthorization() {
  if (error) throw new Error("Authorization was declined or could not be completed.");
  const savedState = sessionStorage.getItem("mm-oauth-state");
  const verifier = sessionStorage.getItem("mm-pkce-verifier");
  const redirectUri = sessionStorage.getItem("mm-redirect-uri");
  if (!code || !returnedState || !savedState || returnedState !== savedState || !verifier || !redirectUri) {
    throw new Error("The authorization response could not be verified. Start again from Moral Mirror.");
  }
  const clientId = window.MORAL_MIRROR_CONFIG?.clientId;
  if (!clientId || clientId === "APP_KEY_PENDING") {
    throw new Error("The app's Pollinations App Key has not been configured yet.");
  }
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: clientId,
    redirect_uri: redirectUri,
    code_verifier: verifier
  });
  const response = await fetch("https://enter.pollinations.ai/api/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  if (!response.ok) throw new Error("Pollinations could not complete the authorization. Please start again.");
  const token = await response.json();
  if (!token.access_token || token.token_type?.toLowerCase() !== "bearer") throw new Error("Pollinations returned an unexpected authorization response.");
  // Same-tab handoff only; app.js immediately removes this value and keeps it in memory.
  sessionStorage.setItem("mm-next-token", token.access_token);
  sessionStorage.removeItem("mm-oauth-state");
  sessionStorage.removeItem("mm-pkce-verifier");
  sessionStorage.removeItem("mm-redirect-uri");
  location.replace(new URL("./", location.href).href);
}

finishAuthorization().catch((reason) => {
  sessionStorage.removeItem("mm-oauth-state");
  sessionStorage.removeItem("mm-pkce-verifier");
  sessionStorage.removeItem("mm-redirect-uri");
  status.textContent = reason instanceof Error ? reason.message : "Authorization failed. Please start again.";
  returnLink.hidden = false;
});
