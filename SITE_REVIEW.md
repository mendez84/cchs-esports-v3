# Team Uproar site review: work brief for Gemini

**Reviewed:** Mon Sep 14, 2026, by Claude, at Mario's request
**Live site:** https://mendez84.github.io/cchs-esports/
**Source:** this repo, `main` @ `401fb8f` (Sun Sep 13, 9:56 PM)

Checked on the live site at 1440 px (desktop) and 375 px (phone), against the source in this
repo, and against the live Google interest form.

> 🔒 **This repo is public.** This file is excluded locally (`.git/info/exclude`) so it can't be
> committed by accident. Keep it that way.

---

## Rules for this work

1. **Follow `AGENTS.md`.** The Apple HIG design is locked. Don't redesign, and don't reintroduce a
   dark or arcade theme. No build tools, no tracking, no analytics.
2. **Don't invent program facts.** Games, rosters, room, times, league status, and equipment are
   Mario's facts. Items tagged **[Mario]** or **[confirm]** need him first.
3. **One commit per item**, with the item ID in the message (e.g. `P0-4: add phone menu`).
4. **Test every change at 375 px and 1440 px wide.**
5. **When `styles.css` changes, bump the `?v=` number** on its `<link>` in `index.html`. That's how
   this site busts the browser cache.

Owner tags: **[Gemini]** can do it now · **[Mario]** is outside the code (Google Form, facts) ·
**[confirm]** Gemini does it after Mario confirms the wording.

---

## What's already good. Don't lose it.

- **Fast.** 49 KB first load, 4 requests, loaded in 0.35 s. Game images are right-sized
  (91–241 KB), lazy-loaded, and carry width/height.
- **Built right.** Real `<a>` links, a skip link, semantic sections, visible focus styles, and a
  reduced-motion rule.
- **One clear action.** The interest form is the top and bottom call to action.
- **Honest roster language** for Overwatch 2 and Marvel Rivals ("depends on roster numbers").
- **4:00–5:00 PM** fits after Mario's 6th period (ends 3:47).
- **Consistent desktop design.** `AGENTS.md` locking it was the right call: 13 commits and four
  redesigns happened in one hour on Sunday night.

---

## P0: fix before sharing the link widely

### P0-1 · The form and the site list different games **[Mario]**

| | Site | Interest form |
|---|:---:|:---:|
| Super Smash Bros. Ultimate | ✅ | ✅ |
| Rocket League | ✅ | ✅ |
| League of Legends | ✅ | ✅ |
| **Overwatch 2** | ✅ roster forming | ❌ **missing** |
| **Marvel Rivals** | ✅ roster forming | ❌ **missing** |
| **Fortnite** | ❌ | ✅ |
| **Mario Kart** | ❌ | ✅ |
| *(blank option)* | | ⚠️ an empty checkbox |

The site says Overwatch 2 and Marvel Rivals rosters form "based on student interest," but the
form gives students no way to pick either one. So there's no way to count that interest.

**Fix (in Google Forms):** add Overwatch 2 and Marvel Rivals. Decide whether Fortnite and Mario
Kart stay on the form (and then on the site) or come off. Delete the blank option.

### P0-2 · The privacy promise doesn't match the form **[Mario]**

The site says: *"All signups and surveys use district-authenticated Google Workspace accounts
(@psusd.us)."* `AGENTS.md` rule 2 requires the same.

**The live form has no sign-in.** Anyone can open it and type any first name, last name, and
"PSUSD student email." That makes the sentence untrue, and it allows fake or prank signups.

**Fix (Google Forms → Settings → Responses):**
1. Confirm the form is **owned by the district account**. It collects student names, so it
   belongs on the district side.
2. Turn on **Restrict to users in Palm Springs USD and its trusted organizations**.
3. Set **Collect email addresses → Verified**, then delete the typed "PSUSD student email"
   question.

If the form is owned by a personal account, recreate it in the district account and update the
three form links in `index.html` **[Gemini]**.

### P0-3 · "Officially competing" vs. "rosters not formed yet" **[Mario] → [confirm]**

The Games section says **"Active Competition Teams · OFFICIALLY COMPETING · Active varsity
rosters currently training and scrimmaging in Room 315,"** and each of Smash, Rocket League, and
League is tagged **"Active Team."**

The Schedule section says **"We do not have set match days… Once our initial team rosters are
formed from signups, official match schedules will be announced."**

Both can't be true. Mario: which is it this season? Also confirm "Multiple dedicated Switch
stations in Room 315" and "with district ETIS support."

**Suggested wording until DVEA matches are scheduled:** heading "Our Core Games," tag "Rosters
forming now." Save "Officially Competing" for when it's true.

### P0-4 · On phones, the section menu disappears **[Gemini]**

`styles.css` ~1047: at `max-width: 680px`, `.nav-anchor { display: none; }`. Nothing replaces it.
At 375 px, only "Join Team" is left, so a phone visitor can't reach Schedule, Games, or Lab
Etiquette from the header. (The `#games` link Mario shares works; the menu doesn't.)

The phone header is also cramped. It's 80 px tall, and three parts wrap onto two lines each:
"Team / Uproar," "CCHS • Room / 315," "Join / Team ↗."

**Fix:**
- Below 680 px, show Schedule · Games · Etiquette as a compact row under the brand, or behind a
  simple menu button. Keep "Join Team."
- Below 480 px, hide `.brand-divider` and `.brand-school`, and add `white-space: nowrap` to the
  brand title and the Join button.

**Done when:** at 375 px, all four destinations are one tap from the header, the header is
≤ 64 px tall, and nothing in it wraps.

---

## P1: first impressions and trust

### P1-1 · Shared links show a bare URL **[Gemini]**

No Open Graph tags and no favicon. When the link goes out by text, Remind, Instagram, or
Discord, there's no title card or image, and the browser tab shows a blank icon.

**Fix:** in `<head>` add `og:title`, `og:description`, `og:url`, `og:image` (1200×630, e.g. the
Team Uproar emblem on the site blue), and `twitter:card=summary_large_image`. Add
`<link rel="icon">` and `apple-touch-icon` made from `assets/8bitlogo.png`.

### P1-2 · The same logistics repeat everywhere **[confirm]**

In 943 words of page text: **"Room 315" ×18**, "Tuesdays" ×6, "Thursdays" ×6, "4:00" ×6. Examples:
- The Open Lab card's heading is "Room 315 • Tuesdays & Thursdays (4:00 – 5:00 PM)," and the four
  emoji chips right under it say Room 315, Tuesdays & Thursdays, 4:00–5:00 PM.
- The Tuesday and Thursday schedule cards are nearly identical.

On a phone this makes the page about **11 screens long**.

**Fix:** state when and where once in the hero, and once in a single "When & Where" block. Merge
Tuesday and Thursday into one row. Remove the duplicate chips.

### P1-3 · Small gray text is too faint **[Gemini]**

`--text-muted: #86868b` on white is about **3.6:1**. Small text needs **4.5:1**. It's used at
11.5–13.6 px on "League Matches:," "CCHS • Room 315," and the "Officially Competing" pill.

**Fix:** for text under 18 px, use `#6e6e73` (about 5.1:1). Keep `#86868b` only for large text.

### P1-4 · The compliance line reads like a legal certification **[confirm]**

*"Complies with FERPA (34 CFR Part 99), COPPA, California SOPIPA, and PSUSD Board Policies."* The
district hasn't reviewed or certified the site, and the sentence right after it is untrue until
P0-2 is done.

**Fix:** use plain, checkable facts. For example: *"This site has no ads, no tracking, and no
accounts. Signups happen through a PSUSD Google Form that requires your school login."* (Only
after P0-2 is done.)

### P1-5 · The README has old facts **[confirm]**

`README.md` says **Room 402 / Computer Lab**, lists **Mario Kart** as a core title, and names
**NASEF**. The site says Room 315 and doesn't mention Mario Kart or NASEF. AI tools read the README
first, so wrong facts there end up in the site.

**Fix:** match the README to the site once P0-1 and P0-3 settle the facts.

### P1-6 · The "DVEA Portal" link goes somewhere else **[Gemini]**

`https://www.psusd.us/dvea` redirects to
`https://www.psusd.us/departments/t/technology/student-tech-programs/esports`, PSUSD's Student
Tech Programs esports page. On phones the link is only **17 px tall** (the tap minimum is 44 px).

**Fix:** link straight to the final URL, label it "PSUSD Esports & DVEA," and pad it to a 44 px
tap target.

---

## P2: cleanup and polish

| # | Owner | What | Fix |
|---|---|---|---|
| P2-1 | Gemini | **Google Fonts are downloaded but never used.** The font stack starts with `-apple-system` / `system-ui`, so Plus Jakarta Sans and Inter never render. It's still an extra request to Google. | Remove the Google Fonts `<link>`, both `preconnect`s, and `fonts.googleapis.com` / `fonts.gstatic.com` from the CSP. (`AGENTS.md` keeps the system stack.) |
| P2-2 | Gemini | **`app.js` only runs `console.log`.** It's a wasted request. | Delete the file and its `<script>` tag. With no inline scripts, `script-src` can drop `'unsafe-inline'`. |
| P2-3 | Gemini | **Emoji inside headings** get read aloud: "handshake Community & Respect," "shield Respect the Equipment." | Wrap the emoji in `<span aria-hidden="true">`. |
| P2-4 | Mario | **Unused assets:** `assets/2023Logo.png` (2.2 MB, 4050×5400) and `assets/cchs-logo.png`. The CCHS logo appears nowhere, so the school shows up only as text. | Either put the CCHS logo in the header or footer, or remove both files. |
| P2-5 | Gemini | **Official game art** from Nintendo, Psyonix/Epic, Riot, Blizzard, and NetEase/Marvel, with no trademark notice. | Footer line: "Game names and artwork are trademarks of their respective owners. CCHS Esports is not affiliated with or endorsed by them." |
| P2-6 | Mario | **Form friction:** "Anything else you want us to know?" is **required**. Grade level is free text. Practice times offer Mon–Fri, but the site says Tue/Thu only. | Make "Anything else" optional. Make grade a 9/10/11/12 dropdown. Keep Mon–Fri only if you're gauging demand for more days. |

---

## P3: worth adding (content from Mario)

- **A short FAQ.** Does it cost anything? Do I need my own console or account? Do I need parent
  permission? I've never played competitively; can I still join? Can I help without playing?
  (The form already asks about content creation and event support.)
- **A real photo of Room 315**, or students playing, with media releases on file (see
  `AGENTS.md` rule 1).
- **A Spanish version**, or at least a Spanish summary for families.
- **A "Results & News" spot** for when DVEA matches start.
- **How to reach the coach** besides "stop by Room 315" (e.g. the district email, once confirmed).

---

## Suggested order

1. **[Mario] Google Form:** P0-1 games and P0-2 sign-in (no code)
2. **[Mario] Facts:** P0-3 rosters, DVEA, Switch stations, ETIS
3. **[Gemini]** P0-4 phone menu and header
4. **[Gemini]** P1-1 link previews and favicon · P1-3 contrast · P1-6 DVEA link · P2-1, P2-2, P2-3, P2-5
5. **[confirm]** P1-2 trim repetition · P1-4 compliance wording · P1-5 README · P3 additions

Step 3 and everything in step 4 need nothing from Mario. Gemini can start there now.
