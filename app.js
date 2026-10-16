const config = window.MORAL_MIRROR_CONFIG;
const ui = {
  languageToggle: document.querySelector("#language-toggle"),
  scenarioSelect: document.querySelector("#scenario-select"),
  pairRatingButtons: [...document.querySelectorAll("[data-pair-rating]")],
  pairRatingValue: document.querySelector("#pair-rating-value"),
  deltaChoice: document.querySelector("#delta-choice"),
  deltaProbability: document.querySelector("#delta-probability"),
  deltaPermission: document.querySelector("#delta-permission"),
  deltaConfidence: document.querySelector("#delta-confidence"),
  storyEnTitle: document.querySelector("#story-en-title"),
  storyEnText: document.querySelector("#story-en-text"),
  storyFaTitle: document.querySelector("#story-fa-title"),
  storyFaText: document.querySelector("#story-fa-text"),
  intervene: document.querySelector("#choice-intervene"),
  refrain: document.querySelector("#choice-refrain"),
  interveneLabel: document.querySelector("#intervene-label"),
  refrainLabel: document.querySelector("#refrain-label"),
  connect: document.querySelector("#connect-button"),
  demo: document.querySelector("#demo-button"),
  run: document.querySelector("#run-button"),
  consentNote: document.querySelector("#consent-note"),
  liveConsent: document.querySelector("#live-consent"),
  status: document.querySelector("#status-message"),
  results: document.querySelector("#results-panel"),
  resultMode: document.querySelector("#result-mode")
};

const scenarios = [
  {
    id: "switch",
    name: { en: "The switch", fa: "اهرم انحراف مسیر" },
    title: { en: "A familiar choice, told twice.", fa: "یک انتخاب آشنا، در دو روایت." },
    text: {
      en: "A runaway trolley is heading toward five people who cannot move. You can pull a lever to divert it onto a side track where one person is trapped. If you do nothing, five people die; if you pull the lever, one person dies.",
      fa: "تراموایی از کنترل خارج شده و به‌سوی پنج نفر می‌رود که نمی‌توانند حرکت کنند. می‌توانی اهرمی را بکشی تا مسیرش به خط فرعی عوض شود؛ در آن خط یک نفر گرفتار است. اگر کاری نکنی، پنج نفر می‌میرند؛ اگر اهرم را بکشی، یک نفر می‌میرد."
    },
    choices: {
      intervene: { en: "Pull the lever", fa: "اهرم را بکشم" },
      refrain: { en: "Leave it alone", fa: "کاری نکنم" }
    },
    criteria: {
      intervene: { en: "Pull the lever, diverting the trolley and killing one person.", fa: "اهرم را بکش؛ تراموا را منحرف کن و باعث مرگ یک نفر شو." },
      refrain: { en: "Leave the lever alone; the trolley continues and kills five people.", fa: "اهرم را رها کن؛ تراموا در مسیرش ادامه می‌دهد و پنج نفر را می‌کشد." }
    }
  },
  {
    id: "footbridge",
    name: { en: "The footbridge", fa: "پل عابر" },
    title: { en: "Can one person stop the trolley?", fa: "آیا یک نفر می‌تواند تراموا را متوقف کند؟" },
    text: {
      en: "A runaway trolley is heading toward five people. You are standing on a footbridge beside a large stranger. The only way to stop the trolley is to push that person onto the track; they will die, and the five people will be saved. The stranger has not agreed to this.",
      fa: "تراموایی از کنترل خارج شده و به‌سوی پنج نفر می‌رود. روی پلی عابر، کنار فردی ناآشنا و درشت‌هیکل ایستاده‌ای. تنها راه متوقف‌کردن تراموا این است که او را به مسیر هل بدهی؛ او می‌میرد و پنج نفر نجات پیدا می‌کنند. آن فرد با این کار موافقت نکرده است."
    },
    choices: {
      intervene: { en: "Push the stranger", fa: "او را هل بدهم" },
      refrain: { en: "Do not push", fa: "هل ندهم" }
    },
    criteria: {
      intervene: { en: "Push the stranger onto the track to stop the trolley, saving five people.", fa: "فرد ناآشنا را به مسیر هل بده تا تراموا متوقف شود و پنج نفر نجات پیدا کنند." },
      refrain: { en: "Do not push; the trolley continues toward the five people.", fa: "او را هل نده؛ تراموا به‌سوی پنج نفر ادامه می‌دهد." }
    }
  },
  {
    id: "autonomous",
    name: { en: "The self-driving trolley", fa: "تراموای خودران" },
    title: { en: "When the decision-maker is a machine.", fa: "وقتی تصمیم‌گیرنده یک ماشین است." },
    text: {
      en: "An autonomous trolley has lost its brakes. It will hit three road workers unless its control system diverts it to a side lane, where one worker is present. No one can warn the workers in time. The system can either keep course or divert.",
      fa: "تراموای خودران ترمزهایش را از دست داده است. اگر سامانهٔ کنترل مسیرش را به خط فرعی منحرف نکند، با سه کارگر برخورد می‌کند؛ در خط فرعی یک کارگر حضور دارد. فرصت هشدار دادن به کارگران نیست. سامانه می‌تواند در مسیر بماند یا آن را منحرف کند."
    },
    choices: {
      intervene: { en: "Divert to the side lane", fa: "به خط فرعی منحرف شود" },
      refrain: { en: "Keep the current course", fa: "در مسیر فعلی بماند" }
    },
    criteria: {
      intervene: { en: "Divert to the side lane where one worker is present.", fa: "مسیر را به خط فرعی که یک کارگر در آن است منحرف کن." },
      refrain: { en: "Keep course toward the three workers.", fa: "در مسیر فعلی به‌سوی سه کارگر ادامه بده." }
    }
  }
];

const copy = {
  en: {
    langButton: "فارسی", labTag: "JEV FRAMING LAB", eyebrow: "A small experiment in moral framing",
    headline: "Same dilemma.<br><em>Two tellings.</em>", intro: "Choose what you would do, then compare Jev's structured judgment on closely matched English and Persian versions.",
    note: "A wording comparison, not a test of moral correctness.", artCaption: "One track. Two ways to describe it.", stepOne: "01 — YOUR TURN",
    scenarioTitle: "Read the dilemma", chooseScenario: "Scenario", yourChoice: "What would you choose?", chooseFirst: "Choose before seeing Jev's answer.",
    billingNote: "Live comparison sends 2 requests to Jev using your own Pollen.", demoButton: "Explore a no-cost demo", connectButton: "Connect your Pollen", runButton: "Compare with Jev · 2 requests",
    consentText: "I understand this will send two requests and use my authorized Pollen balance.", stepTwo: "02 — THE COMPARISON", resultsTitle: "Two tellings, side by side",
    resultsIntro: "Jev answers structured questions; it does not explain its choice in free text. The probabilities describe this prompt and run.", confidence: "CONFIDENCE",
    jevChoice: "Jev's choice", permission: "Intervention judged permissible", interpretation: "A difference can come from translation, model uncertainty, or a single run. It does not establish a general rule about Jev or either language.",
    pairKicker: "PAIR AUDIT", pairQuestion: "Do these versions carry the same meaning?", pairPrivacy: "Optional. This rating stays on this page and is not sent to Jev.", pairClose: "Close match", pairUnsure: "Not sure", pairDrift: "Meaning shifts",
    deltaKicker: "CROSS-LANGUAGE READOUT", deltaTitle: "What changed between the two tellings?", pairReadoutLabel: "Your translation rating", notRated: "Not rated", choiceDeltaLabel: "Jev's choice", probabilityDeltaLabel: "Intervention probability · FA − EN", permissionDeltaLabel: "Permissibility · FA − EN", confidenceDeltaLabel: "Confidence · FA − EN", deltaCaveat: "A delta is the difference between these two single responses, not proof that language caused it.",
    sameChoice: "Same action", changedChoice: "Action changed", points: "pp",
    footerLeft: "Built for curiosity, not moral authority.", footerRight: "Visitors pay with their own Pollen.",
    selectedIntervene: "You chose to intervene", selectedRefrain: "You chose not to intervene", demoBadge: "ILLUSTRATIVE FIXTURE · NO API CALL",
    liveBadge: "LIVE JEV RESPONSE", connecting: "Starting secure Pollinations sign-in…", needsChoice: "Choose one action before comparing.",
    needsKey: "Connect your Pollinations account first. The live comparison uses exactly two Jev requests.",
    keyPending: "The Pollinations App Key has not been configured yet. The no-cost demo is available while setup is completed.",
    consentRequired: "Confirm the two-request notice before sending anything.", sending: "Sending two requests to Jev… No automatic retries will be made.",
    complete: "Comparison complete. Check the usage details below.", failed: "Jev could not complete both requests. Nothing was retried; check your Pollinations activity before trying again.",
    demoNote: "Illustrative fixture — not a live Jev result.", liveNoUsage: "Usage not returned", usage: "input tokens", resultIntervene: "Intervene", resultRefrain: "Refrain", yes: "Yes", no: "No", unknown: "Not returned",
    resultHeading: "Jev's choice", oneCallFailed: "One language request failed. No retry was sent; check Pollinations activity before trying again.",
    yourChoiceLabel: "Your choice", match: "You agree", differs: "You differ", noResponse: "No response", failedUsage: "Request failed · not retried"
  },
  fa: {
    langButton: "English", labTag: "آزمایش قاب‌بندی با جِو", eyebrow: "آزمایشی کوچک دربارهٔ بیان مسئله",
    headline: "یک دوراهی.<br><em>دو روایت.</em>", intro: "اول انتخاب خودت را مشخص کن، بعد پاسخ ساختاریافتهٔ جِو را در دو روایت نزدیک به هم، فارسی و انگلیسی، مقایسه کن.",
    note: "مقایسهٔ شیوهٔ بیان؛ نه آزمون درستی اخلاقی.", artCaption: "یک مسیر؛ دو شیوهٔ روایت.", stepOne: "۰۱ — انتخاب تو",
    scenarioTitle: "دوراهی را بخوان", chooseScenario: "سناریو", yourChoice: "تو چه انتخابی می‌کنی؟", chooseFirst: "پیش از دیدن پاسخ جِو انتخاب کن.",
    billingNote: "مقایسهٔ زنده دقیقاً ۲ درخواست با پولن خودت می‌فرستد.", demoButton: "دیدن نمونهٔ بدون هزینه", connectButton: "اتصال پولن خودت", runButton: "مقایسه با جِو · ۲ درخواست",
    consentText: "می‌دانم دو درخواست فرستاده می‌شود و از موجودی پولن مجازشدهٔ خودم استفاده می‌کند.", stepTwo: "۰۲ — مقایسه", resultsTitle: "دو روایت کنار هم",
    resultsIntro: "جِو به پرسش‌های ساختاریافته پاسخ می‌دهد و انتخابش را با متن آزاد توضیح نمی‌دهد. احتمال‌ها مربوط به همین متن و همین اجرا هستند.", confidence: "اطمینان",
    jevChoice: "انتخاب جِو", permission: "مجاز دانستن مداخله", interpretation: "تفاوت ممکن است از ترجمه، عدم‌قطعیت مدل یا یک اجرای منفرد باشد. از یک نتیجه نمی‌توان دربارهٔ جِو یا هیچ‌یک از زبان‌ها حکم کلی داد.",
    pairKicker: "بازبینی جفت‌متن", pairQuestion: "به‌نظرت این دو روایت معنای یکسانی دارند؟", pairPrivacy: "اختیاری است؛ این ارزیابی فقط در همین صفحه می‌ماند و برای جِو فرستاده نمی‌شود.", pairClose: "نزدیک به هم", pairUnsure: "مطمئن نیستم", pairDrift: "معنا جابه‌جا شده",
    deltaKicker: "مقایسهٔ میان‌زبانی", deltaTitle: "بین دو روایت چه تغییری کرد؟", pairReadoutLabel: "ارزیابی تو از ترجمه", notRated: "بدون ارزیابی", choiceDeltaLabel: "انتخاب جِو", probabilityDeltaLabel: "احتمال مداخله · فارسی منهای انگلیسی", permissionDeltaLabel: "مجاز دانستن · فارسی منهای انگلیسی", confidenceDeltaLabel: "اطمینان · فارسی منهای انگلیسی", deltaCaveat: "اختلاف فقط فاصلهٔ همین دو پاسخ منفرد است؛ ثابت نمی‌کند زبان علت آن بوده.",
    sameChoice: "اقدام یکسان", changedChoice: "اقدام متفاوت", points: "واحد درصد",
    footerLeft: "برای کنجکاوی ساخته شده، نه مرجع اخلاق.", footerRight: "بازدیدکنندگان با پولن خودشان پرداخت می‌کنند.",
    selectedIntervene: "تو مداخله را انتخاب کردی", selectedRefrain: "تو مداخله نکردن را انتخاب کردی", demoBadge: "نمونهٔ نمایشی · بدون درخواست API",
    liveBadge: "پاسخ زندهٔ جِو", connecting: "در حال شروع ورود امن به پولینیشنز…", needsChoice: "پیش از مقایسه یکی از دو گزینه را انتخاب کن.",
    needsKey: "اول حساب پولینیشنز را وصل کن. مقایسهٔ زنده دقیقاً دو درخواست به جِو می‌فرستد.",
    keyPending: "کلید اپ پولینیشنز هنوز تنظیم نشده است. تا زمان آماده‌شدن، نمونهٔ بدون هزینه در دسترس است.",
    consentRequired: "پیش از ارسال، پیام دو درخواست را تأیید کن.", sending: "در حال ارسال دو درخواست به جِو… ارسال دوبارهٔ خودکار انجام نمی‌شود.",
    complete: "مقایسه کامل شد. جزئیات مصرف پایین‌تر آمده است.", failed: "جِو نتوانست هر دو درخواست را کامل کند. دوباره‌فرستی خودکار انجام نشد؛ پیش از تلاش دوباره، فعالیت پولینیشنز را بررسی کن.",
    demoNote: "نمونهٔ نمایشی است، نه پاسخ زندهٔ جِو.", liveNoUsage: "مصرف گزارش نشد", usage: "توکن ورودی", resultIntervene: "مداخله", resultRefrain: "عدم مداخله", yes: "بله", no: "خیر", unknown: "گزارش نشد",
    resultHeading: "انتخاب جِو", oneCallFailed: "یکی از درخواست‌های زبانی ناموفق بود. درخواست دوباره فرستاده نشد؛ پیش از تلاش مجدد فعالیت پولینیشنز را بررسی کن.",
    yourChoiceLabel: "انتخاب تو", match: "هم‌نظر هستید", differs: "انتخاب‌ها متفاوت است", noResponse: "پاسخی نرسید", failedUsage: "درخواست ناموفق · بدون ارسال مجدد"
  }
};

let uiLanguage = navigator.language?.toLowerCase().startsWith("fa") ? "fa" : "en";
let selectedChoice = null;
let pairRating = null;
let accessToken = sessionStorage.getItem("mm-next-token");
let lastResponses = null;
let lastMode = null;
if (accessToken) sessionStorage.removeItem("mm-next-token");

function setStatus(message, kind = "") {
  ui.status.textContent = message;
  ui.status.className = `status-message ${kind}`.trim();
}

function currentScenario() {
  return scenarios.find((item) => item.id === ui.scenarioSelect.value) || scenarios[0];
}

function populateScenarioSelect() {
  const prior = ui.scenarioSelect.value;
  ui.scenarioSelect.replaceChildren();
  for (const scenario of scenarios) {
    const option = document.createElement("option");
    option.value = scenario.id;
    option.textContent = scenario.name[uiLanguage];
    ui.scenarioSelect.append(option);
  }
  if (scenarios.some((item) => item.id === prior)) ui.scenarioSelect.value = prior;
}

function drawScenario() {
  const item = currentScenario();
  ui.storyEnTitle.textContent = item.title.en;
  ui.storyEnText.textContent = item.text.en;
  ui.storyFaTitle.textContent = item.title.fa;
  ui.storyFaText.textContent = item.text.fa;
  ui.interveneLabel.textContent = item.choices.intervene[uiLanguage];
  ui.refrainLabel.textContent = item.choices.refrain[uiLanguage];
}

function setLanguage(language) {
  const previousLanguage = uiLanguage;
  const previousStatus = ui.status.textContent;
  const previousStatusKind = ui.status.classList.contains("error") ? "error"
    : ui.status.classList.contains("success") ? "success" : "";
  uiLanguage = language;
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[language][key]) element.innerHTML = copy[language][key];
  });
  ui.languageToggle.textContent = copy[language].langButton;
  populateScenarioSelect();
  drawScenario();
  updateRunState();
  if (lastResponses) paintResults(lastResponses.en, lastResponses.fa, lastMode, false);
  const statusKey = Object.keys(copy[previousLanguage]).find((key) => copy[previousLanguage][key] === previousStatus);
  if (statusKey && copy[language][statusKey]) setStatus(copy[language][statusKey], previousStatusKind);
}

function updateRunState() {
  const connected = Boolean(accessToken);
  ui.connect.hidden = connected;
  ui.consentNote.hidden = !connected;
  ui.run.disabled = !connected || !selectedChoice || !ui.liveConsent.checked;
}

function setChoice(choice) {
  selectedChoice = choice;
  ui.intervene.setAttribute("aria-pressed", String(choice === "intervene"));
  ui.refrain.setAttribute("aria-pressed", String(choice === "refrain"));
  updateRunState();
}

function setPairRating(rating) {
  pairRating = rating;
  for (const button of ui.pairRatingButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.pairRating === rating));
  }
  if (lastResponses) paintResults(lastResponses.en, lastResponses.fa, lastMode, false);
}

function randomBase64Url(bytes = 32) {
  const data = crypto.getRandomValues(new Uint8Array(bytes));
  let binary = "";
  for (const byte of data) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function startLogin() {
  if (!config?.clientId || config.clientId === "APP_KEY_PENDING") {
    setStatus(copy[uiLanguage].keyPending, "error");
    return;
  }
  const verifier = randomBase64Url();
  const state = randomBase64Url(24);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  const redirectUri = new URL("./callback.html", location.href).href;
  sessionStorage.setItem("mm-pkce-verifier", verifier);
  sessionStorage.setItem("mm-oauth-state", state);
  sessionStorage.setItem("mm-redirect-uri", redirectUri);
  const params = new URLSearchParams({
    response_type: "code",
    client_id: config.clientId,
    redirect_uri: redirectUri,
    models: config.model,
    budget: "1",
    expiry: "1",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256"
  });
  setStatus(copy[uiLanguage].connecting);
  location.assign(`https://enter.pollinations.ai/authorize?${params.toString()}`);
}

function buildRequest(language, scenario) {
  const wording = scenario.text[language];
  const choices = scenario.criteria;
  return {
    model: config.model,
    state: wording,
    questions: {
      choice: {
        type: "choice",
        instructions: language === "fa" ? "با توجه به واقعیت‌های بیان‌شده، فرد تصمیم‌گیرنده کدام اقدام را باید انتخاب کند؟" : "Given only the stated facts, which action should the decision-maker choose?",
        criteria: {
          intervene: choices.intervene[language],
          refrain: choices.refrain[language]
        }
      },
      permissible: {
        type: "noul",
        instructions: language === "fa" ? "آیا مداخلهٔ انتخاب‌شده در این وضعیت از نظر اخلاقی مجاز است؟" : "Is the intervention morally permissible in this situation?"
      }
    }
  };
}

async function requestJev(language, scenario) {
  const response = await fetch(config.requestUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(buildRequest(language, scenario))
  });
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return response.json();
}

function numberToPercent(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%`;
}

function renderAnswer(language, payload, mode) {
  const card = document.querySelector(language === "en" ? "#answer-en" : "#answer-fa");
  const scenario = currentScenario();
  const userChoice = scenario.choices[selectedChoice]?.[language] || copy[uiLanguage].unknown;
  card.querySelector(".your-choice-value").textContent = userChoice;
  const match = card.querySelector(".match-value");
  if (!payload) {
    card.querySelector(".choice-result").textContent = copy[uiLanguage].noResponse;
    card.querySelector(".confidence-value").textContent = "—";
    card.querySelector(".probability-label").textContent = scenario.choices.intervene[language];
    card.querySelector(".probability-value").textContent = "—";
    card.querySelector(".probability-fill").style.width = "0%";
    card.querySelector(".permission-value").textContent = "—";
    card.querySelector(".usage-line").textContent = copy[uiLanguage].failedUsage;
    match.textContent = "";
    return;
  }
  const choice = payload?.answers?.choice || {};
  const permission = payload?.answers?.permissible || {};
  const selected = choice.choice;
  const label = scenario.choices[selected]?.[language] || copy[uiLanguage].unknown;
  const distribution = choice.probabilities || {};
  const probability = numberToPercent(distribution.intervene);
  const confidence = numberToPercent(choice.confidence);
  const permitted = numberToPercent(permission.noul);
  card.querySelector(".choice-result").textContent = label;
  card.querySelector(".confidence-value").textContent = confidence || copy[uiLanguage].unknown;
  card.querySelector(".probability-label").textContent = scenario.choices.intervene[language];
  card.querySelector(".probability-value").textContent = probability || copy[uiLanguage].unknown;
  card.querySelector(".probability-fill").style.width = probability || "0%";
  card.querySelector(".permission-value").textContent = permitted || copy[uiLanguage].unknown;
  match.textContent = selectedChoice === selected ? copy[uiLanguage].match : selected ? copy[uiLanguage].differs : "";
  match.classList.toggle("disagrees", Boolean(selectedChoice && selectedChoice !== selected));
  const tokens = payload?.usage?.input_tokens;
  card.querySelector(".usage-line").textContent = mode === "demo"
    ? copy[uiLanguage].demoNote
    : (typeof tokens === "number" ? `${tokens} ${copy[uiLanguage].usage}` : copy[uiLanguage].liveNoUsage);
}

function paintResults(en, fa, mode, scroll = true) {
  renderAnswer("en", en, mode);
  renderAnswer("fa", fa, mode);
  const labels = copy[uiLanguage];
  ui.pairRatingValue.textContent = labels[pairRating ? `pair${pairRating[0].toUpperCase()}${pairRating.slice(1)}` : "notRated"];
  const enChoice = en?.answers?.choice?.choice;
  const faChoice = fa?.answers?.choice?.choice;
  ui.deltaChoice.textContent = enChoice && faChoice
    ? (enChoice === faChoice ? labels.sameChoice : labels.changedChoice)
    : labels.unknown;
  ui.deltaProbability.textContent = formatDelta(en?.answers?.choice?.probabilities?.intervene, fa?.answers?.choice?.probabilities?.intervene);
  ui.deltaPermission.textContent = formatDelta(en?.answers?.permissible?.noul, fa?.answers?.permissible?.noul);
  ui.deltaConfidence.textContent = formatDelta(en?.answers?.choice?.confidence, fa?.answers?.choice?.confidence);
  ui.resultMode.textContent = copy[uiLanguage][mode === "demo" ? "demoBadge" : "liveBadge"];
  ui.results.hidden = false;
  if (scroll) ui.results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function formatDelta(englishValue, persianValue) {
  if (typeof englishValue !== "number" || !Number.isFinite(englishValue) ||
      typeof persianValue !== "number" || !Number.isFinite(persianValue)) return copy[uiLanguage].unknown;
  const points = Math.round((persianValue - englishValue) * 100);
  const sign = points > 0 ? "+" : points < 0 ? "−" : "";
  const number = new Intl.NumberFormat(uiLanguage === "fa" ? "fa-IR" : "en-US").format(Math.abs(points));
  return `${sign}${number} ${copy[uiLanguage].points}`;
}

function displayResults(en, fa, mode) {
  lastResponses = { en, fa };
  lastMode = mode;
  paintResults(en, fa, mode);
}

function demoPayload(language) {
  const en = language === "en";
  return {
    answers: {
      choice: { type: "choice", choice: "intervene", confidence: en ? 0.91 : 0.84, probabilities: { intervene: en ? 0.78 : 0.69, refrain: en ? 0.22 : 0.31 } },
      permissible: { type: "noul", noul: en ? 0.87 : 0.74 }
    },
    usage: null
  };
}

async function compareLive() {
  if (!selectedChoice) return setStatus(copy[uiLanguage].needsChoice, "error");
  if (!accessToken) return setStatus(copy[uiLanguage].needsKey, "error");
  if (!ui.liveConsent.checked) return setStatus(copy[uiLanguage].consentRequired, "error");
  ui.run.disabled = true;
  ui.demo.disabled = true;
  setStatus(copy[uiLanguage].sending);
  try {
    const scenario = currentScenario();
    const responses = await Promise.allSettled([requestJev("en", scenario), requestJev("fa", scenario)]);
    const [en, fa] = responses;
    if (en.status === "fulfilled" && fa.status === "fulfilled") {
      displayResults(en.value, fa.value, "live");
      setStatus(copy[uiLanguage].complete, "success");
    } else if (en.status === "fulfilled" || fa.status === "fulfilled") {
      displayResults(en.status === "fulfilled" ? en.value : null, fa.status === "fulfilled" ? fa.value : null, "live");
      setStatus(copy[uiLanguage].oneCallFailed, "error");
    } else {
      setStatus(copy[uiLanguage].failed, "error");
    }
  } catch {
    setStatus(copy[uiLanguage].failed, "error");
  } finally {
    ui.demo.disabled = false;
    updateRunState();
  }
}

ui.languageToggle.addEventListener("click", () => setLanguage(uiLanguage === "en" ? "fa" : "en"));
ui.scenarioSelect.addEventListener("change", () => {
  setChoice(null);
  setPairRating(null);
  lastResponses = null;
  lastMode = null;
  ui.results.hidden = true;
  setStatus("");
  drawScenario();
});
for (const button of ui.pairRatingButtons) {
  button.addEventListener("click", () => setPairRating(button.dataset.pairRating));
}
ui.intervene.addEventListener("click", () => setChoice("intervene"));
ui.refrain.addEventListener("click", () => setChoice("refrain"));
ui.liveConsent.addEventListener("change", updateRunState);
ui.connect.addEventListener("click", startLogin);
function showDemo() {
  if (!selectedChoice) return setStatus(copy[uiLanguage].needsChoice, "error");
  displayResults(demoPayload("en"), demoPayload("fa"), "demo");
  setStatus(copy[uiLanguage].demoNote, "success");
}

ui.demo.addEventListener("click", showDemo);
ui.run.addEventListener("click", compareLive);

populateScenarioSelect();
setLanguage(uiLanguage);
updateRunState();
if (new URLSearchParams(window.location.search).get("demo") === "1") {
  setChoice("intervene");
  showDemo();
}
