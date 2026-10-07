# HarNova social kit

Same "Nova" design language as harnova.my: paper #F5F4F0, ink #0D0D12, Inter Tight + Instrument Serif italic accents, the nova gradient and 4-point star.

- `templates/` — HTML templates for 1080x1350 carousels and the 1080x1920 video. Fonts load from `../node_modules/@fontsource*` (run `npm install` at repo root) and images from `../public/shots` and `../public/icons`.
- `tools/render.mjs` — renders slides to PNG with Playwright. `tools/video.mjs` — renders the video frame by frame (then encode with ffmpeg).
- `tools/ig-*` — offline hook scorer, caption linter and humanizer (MIT, from Jakeschincariol/instagram-agent-skill).
- `posts/` — every post we've made: images, video and the exact caption used.

## Rules for every post
- Hook scores 70+ on `python3 tools/ig-reel/hookscore.py`.
- Caption passes `tools/ig-caption/caption.py` (max 5 hashtags, one ask) and scores 70+ on `tools/ig-human/detect.py`.
- Only real facts: products, prices and awards as listed on harnova.my. Never invent clients, numbers or testimonials.
- Mix: 1 work/product showcase, 1 practical tip for SMEs, 1 for students or behind-the-scenes, each week.
