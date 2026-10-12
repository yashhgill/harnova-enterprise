# Nova After Hours: series bible + scripts

A short 3D comedy series for HarNova's Instagram. Tiny low-poly characters live on the HarNova desk at night: a giant keyboard, a teh tarik glass the size of a building, a monitor of code glowing behind them.

Every episode: **30–45s, 9:16, cold open, one disaster, it gets worse, a twist, 1-second sting.**

---

## Cast

| Character | Look | Personality | Voice |
|---|---|---|---|
| **Nova** | The HarNova 4-point star as a creature. Pink→purple→cyan gradient, one big white eye, stubby navy legs, white shoes. | Deadpan. Always right. Never panics. | **No words.** Short chirps and bleeps (in the SFX), with subtitles in brackets, e.g. *[stares]* or *[slowly opens calculator]*. Works in every language, and no voice actor needed. |
| **Boss** | Small-business owner. Teal batik shirt, phone always in hand. | Confident, impatient, wants it cheap and yesterday. Means well. | Malaysian English, 40s, fast, warm, a bit loud. Says "can or not", "simple one only", "lah". |
| **Adik** | Student in an oversized hoodie, laptop under his arm, eye bags. | 3am energy. Breaks things right before demo day. | 21, tired, voice cracks when panicking, speaks fast. |

Rules that never bend:
- It's **fiction**. Never present a skit as a real client story, and never use real client names in a joke.
- Nova **coaches** students. Nova never builds someone's FYP for them. The punchline is always "you fixed it yourself."
- Prices and products only from `src/data.js`.

## The format

- **0:00:** The first spoken line is the hook. No logo, no "hi guys". It has to score 70+ on `tools/ig-reel/hookscore.py`.
- **Every 2–4s:** New camera angle or new beat.
- **Middle:** Each line makes the problem worse.
- **Twist:** Nova does one small, calm thing that flips it.
- **Last 1s:** Nova hops onto the spacebar, *click*, white flash, star + HARNOVA. The same sting every time. That's our intro, at the end.
- **Corner tag** the whole time: `NOVA AFTER HOURS · EP 3`.
- **Subtitles:** big, white, centre-top (people watch muted).

## Voice-over workflow

1. Give each character's line from the scripts below to your voice tool, with the [direction] in brackets. One file per line is easiest.
2. Good options: **CapCut** text-to-speech (free, built in, and you can do subtitles and music in the same app), or **ElevenLabs** (more natural, better for Boss's accent). Check that your plan allows commercial use before posting.
3. Send me the audio files and I'll time the animation and subtitles to them. Nova's chirps, clicks and music bed I generate myself.

## Sound: what you can actually use

HarNova is a **business account**, so most chart songs are greyed out or get muted. Business accounts usually only get the commercial library plus some "original audio" trends, and even those aren't royalty-free for ads.
So the play is: **copy the trend's format, not its song.** In the IG audio picker, check whether the trend sound is available. If it is, use it. If not, keep the format and use our own SFX bed, or a track from the commercial library.

Trends worth adapting right now (week of 7–9 Oct 2026):

| Trend | What it is | Our version |
|---|---|---|
| **#GrrMondays** | Monday expectation vs reality. Big this month. (Don't use the movie-bear clip itself. Copy the idea.) | **Ep 4.** Boss's Monday morning voice-note flood. Post it on a Monday morning. |
| **"Getting robbed"** (original audio) | Someone's glued to their phone while something gets stolen behind them. | **Ep 3.** Boss scrolls while customers walk away from his "PM for price" sign. |
| **Loading 0% → 100%** ("Windows in Brazil (Sped Up)") | A look builds up with a % counter. | Nova deploying a site: 0% chat window → 100% live with SSL. Shows off HarNova Build. |
| **"Where are you"** (original audio) | A fake iMessage, then a reveal of where you actually are. | Boss texts "where are you" → the reveal is Nova sitting on the spacebar at 2am. Great as Ep 0 / the channel trailer. |
| **"Plane so low"** (original audio) | Weird tension, then the real announcement. | Use for real news: a new product, a launch. |
| **"Take that chance"** ("What You Waiting For?") | Fast cuts of setbacks → wins, text on the beat. | Recap: our builds and the two awards (MediLink 2nd at HIK@M 2026, AI Planter 1st in Program SULAM, FTMK UTeM). |

Trends die in about 2 weeks. Ask me to refresh this table before each batch.

---

## Scripts

### EP 1: "Shopee, RM500"  (≈35s · hook score 84)

| Time | Shot | Line / action | Sound |
|---|---|---|---|
| 0:00 | Two-shot on the keyboard | **BOSS:** "Nova, can you build Shopee? Only RM500, can or not?" *[confident, fast, already looking at his phone]* | Lo-fi bed starts, typing clicks |
| 0:04 | Close on Nova | *[Nova blinks once]* | Single chirp, rising |
| 0:06 | Boss | **BOSS:** "Simple one only. Login, cart, payment, delivery tracking, live chat, seller app…" *[speeding up, counting on fingers]* | Each item = a soft pop |
| 0:12 | Nova | *[Nova slowly drags a giant calculator over from the edge of the keyboard]* | Heavy scrape |
| 0:15 | Calculator screen | Number keeps growing: zeros keep getting added | Ticking, faster and faster |
| 0:19 | Boss | **BOSS:** "…ok ok. What CAN I get?" *[deflated]* | Bed drops out |
| 0:22 | Nova | *[Nova turns the calculator around: "Online store · from RM8,000"]* | Bright chirp |
| 0:26 | Boss | **BOSS:** "Can got discount?" *[immediately]* | Record scratch |
| 0:28 | Nova | *[Nova's eye squints. Long stare.]* | Descending sad chirp |
| 0:32 | Sting | Nova hops onto the spacebar → flash → HARNOVA | Click + whoosh |

Caption idea: "every web dev has met this boss 💀 online stores from RM8k, Shopee not included. tag your Boss"

### EP 2: "Demo in 6 hours"  (≈40s · hook score 77)

| Time | Shot | Line / action | Sound |
|---|---|---|---|
| 0:00 | Adik runs in, laptop open | **ADIK:** "My FYP demo is in 6 hours. Nothing works. Don't panic." *[clearly panicking]* | Alarm-clock tick |
| 0:04 | Nova | *[stares at the laptop]* | Question chirp |
| 0:06 | Adik | **ADIK:** "It worked yesterday. I didn't change anything." | |
| 0:09 | Nova | *[Nova points one star-tip at the screen: "47 files changed"]* | Ding |
| 0:11 | Adik | **ADIK:** "…I updated everything." *[tiny voice]* | Bed stops |
| 0:14 | Adik | **ADIK:** "Can you just fix it for me?" | |
| 0:16 | Nova | *[Nova shakes its whole body: no. Slides a sticky note over: "read the error. line 1."]* | Two short "nuh-uh" bleeps |
| 0:20 | Adik reads | **ADIK:** "Cannot connect to database… oh. OH. I changed the password." | Typing |
| 0:27 | Laptop | Green "Server running" | Success chime |
| 0:29 | Adik | **ADIK:** "I fixed it. I FIXED IT. Wait, I actually understand my own code now?" | Bed returns, happier |
| 0:34 | Nova | *[Nova gives a tiny nod]* | Proud chirp |
| 0:36 | Sting | | |

Caption idea: "you build it. we help you find the bug. demo & viva prep RM200, debug rescue RM300–800. send this to your FYP partner"

### EP 3: "PM for price"  (≈30s · "Getting robbed" format · hook score 78)

| Time | Shot | Line / action | Sound |
|---|---|---|---|
| 0:00 | Boss on his phone in front of his tiny shop sign | **BOSS:** "Why is nobody buying? I posted 40 times this week." *[scrolling, not looking up]* | Trend audio if available, otherwise lo-fi |
| 0:04 | Wide | Behind him, a tiny customer walks up to the sign: "PM for price" | |
| 0:06 | Customer | *[looks at the sign, shrugs, walks away]* | Sad bloop |
| 0:08 | Wide | 2, 3, 5 customers do the same thing. Boss never looks up. | Bloop, bloop, bloop, faster |
| 0:14 | Nova | *[sticks a note on the sign: "RM25"]* | Chirp |
| 0:16 | Wide | A queue forms instantly | Cash-register ding ×3 |
| 0:20 | Boss looks up | **BOSS:** "Wah. The algorithm finally likes me." | |
| 0:23 | Nova | *[slow turn to camera]* | Deadpan bleep |
| 0:26 | Sting | | |

Caption idea: "the algorithm was never the problem 😭 show your price. tag a business that needs this"

### EP 4: "#GrrMondays"  (≈25s · post on a Monday, before 9am · hook score 81)

| Time | Shot | Line / action | Sound |
|---|---|---|---|
| 0:00 | Nova's phone, the size of a door | Subtitle: **"You sent 47 voice notes before 9am on a Monday."** | Phone buzzing nonstop |
| 0:03 | Voice-note bubbles stack up to the ceiling | **BOSS (voice note):** "Nova, small change only…" / "Nova, another small change…" / "Nova, ignore the last one…" | Each bubble = a pop, getting faster |
| 0:12 | Nova | *[Nova plays all 47 at 2x speed]* | Chipmunk babble |
| 0:16 | Nova | *[types one reply: "Send me one list. In writing."]* | Single key click |
| 0:19 | Boss | **BOSS:** "Ok." *[1 second pause]* *[sends a voice note]* | Pop. Nova sighs (low bleep) |
| 0:23 | Sting + "#GrrMondays" sticker | | |

### EP 0 / trailer: "Where are you"  (≈12s · original audio)

Fake iMessage: **Boss:** "where are you" → **Boss:** "the website down ah?" → reveal: Nova sitting alone on the spacebar at 2am under the monitor glow, teh tarik next to it. Text: "Nova After Hours. New episodes every week." The sting.

---

## Production notes (for Claude)

- Scene: `social/series/nova-test.html` (Three.js), rendered frame by frame like `tools/video.mjs`. Serve over http (module imports): `python3 -m http.server --directory /`.
- SFX + music bed are generated in code (`sfx.py` style), so there are no licensing issues.
- Final MP4: H.264, yuv420p, AAC audio, 1080x1920, 30fps.
