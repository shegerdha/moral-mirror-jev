<!-- CORVEXA:BEGIN (managed block — do not edit by hand; update via corvexa tools/attach_pointer.py) -->
## ⚠️ این پروژه با Corvexa اداره می‌شود — قبل از هر کاری بخوان
This project is managed by **Corvexa** (project_id: `pollinations-quest-17647`). Any agent/tool (Codex, Cursor, Cline, Claude Code, Freebuff, …) MUST follow it, even if the user never mentions Corvexa.

1. Find Corvexa: env `CORVEXA_HOME`, else `~/.corvexa/install.yaml` (Windows: `%USERPROFILE%\.corvexa\install.yaml`). Known copies: cloud box `/workspace/corvexa`; git `shegerdha:/srv/git/corvexa.git` (branch `main`) — clone it if no local copy.
2. Read Corvexa `AGENTS.md`, then `CONTINUE.md`, and follow them before touching code.
3. Start of every new chat/session: give the human a short status report first (work summary, interruption point, open questions, next step) — DEC-00012.
4. Record every question to the human before asking and every answer right after (`questions.yaml`) — DEC-00011.
5. Before each step update `current_activity`; checkpoint started/finished; commit + push Corvexa records — DEC-00013.
6. If Corvexa cannot be found: say so to the human; do not claim to resume a previous Run.
<!-- CORVEXA:END -->

# Project instructions

## Product direction
Build a polished, bilingual English/Persian app called Moral Mirror. Its primary experiment compares Jev's structured decision probabilities across carefully matched English and Persian versions of trolley dilemmas. Show the visitor's choice before revealing Jev's result.

## Safety and billing
- Use Pollinations BYOP OAuth with PKCE. A visitor must authorize their own scoped key and budget.
- Never ship or request the maintainer's secret key.
- Keep user-authorized tokens in memory; allow sessionStorage only for a same-tab OAuth callback handoff. Never store keys in localStorage, URLs, analytics, or logs.
- Default all local verification to fixtures. No live billed request unless the account owner approves its exact request count and maximum Pollen spend at action time.
- Do not create a new Pollinations App Key without the account owner's confirmation of the app name, redirect URI, access, and budget.

## Research integrity
- Keep paired texts close in meaning and disclose editorial differences.
- Show the exact variant, model, confidence/probability distribution, and any usage returned.
- State that results describe the displayed prompt and run; do not claim broad conclusions from a single response.
