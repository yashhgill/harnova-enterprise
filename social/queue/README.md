# Instagram queue

One file per day: `YYYY-MM-DD.json` (Malaysia date). The GitHub Action `.github/workflows/instagram-post.yml` runs every day at 8:30pm MYT and publishes that day's file **only if `"approved": true`**.

Approve a post: open the file on GitHub, change `"approved": false` to `true`, commit. (Or tell Claude "approve 10–16 Oct".)

Media lives in `public/social/...` so it's served from https://harnova.my/social/... — Instagram needs public URLs, JPG for images, H.264 MP4 for Reels.

After posting, the Action writes `"posted": { "id", "at" }` back into the file. Errors are written to `"error"`.

Post one manually: GitHub → Actions → "Post to Instagram" → Run workflow → enter the date.

## Secrets (GitHub → Settings → Secrets and variables → Actions)
- `IG_USER_ID` — the Instagram Business account ID
- `IG_ACCESS_TOKEN` — a long-lived token. Easiest: Meta app with **Instagram API with Instagram Login** (no Facebook Page needed), scopes `instagram_business_basic` + `instagram_business_content_publish`. These tokens last 60 days; generate a new one before then and update the secret.
