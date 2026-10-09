// Publishes today's queued post to Instagram via the official Graph API.
// Queue: social/queue/<YYYY-MM-DD>.json  (date in Malaysia time)
//   { "approved": true, "type": "image" | "carousel" | "reel",
//     "media": ["social/2026-10-10/slide-1.jpg", ...],   // paths under public/, served at https://harnova.my/
//     "caption": "..." }
// Only posts files with "approved": true and no "posted" field. Writes the result back into the file.
// Env: IG_USER_ID, IG_ACCESS_TOKEN, SITE_URL (default https://harnova.my), POST_DATE (optional override)
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const { IG_USER_ID, IG_ACCESS_TOKEN } = process.env
// Tokens from 'Instagram API with Instagram Login' start with IG and use graph.instagram.com;
// tokens from the Facebook Login flow use graph.facebook.com.
const GRAPH = (IG_ACCESS_TOKEN || '').startsWith('IG') ? 'https://graph.instagram.com/v21.0' : 'https://graph.facebook.com/v21.0'
const SITE = (process.env.SITE_URL || 'https://harnova.my').replace(/\/$/, '')
const today = process.env.POST_DATE || new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10)
const file = `social/queue/${today}.json`

const log = (...a) => console.log('[ig-post]', ...a)
const sleep = ms => new Promise(r => setTimeout(r, ms))

if (!existsSync(file)) { log(`nothing queued for ${today}`); process.exit(0) }
const post = JSON.parse(readFileSync(file, 'utf8'))
if (post.posted) { log(`${today} already posted (${post.posted.id})`); process.exit(0) }
if (post.approved !== true) { log(`${today} is queued but not approved, skipping`); process.exit(0) }
if (!IG_USER_ID || !IG_ACCESS_TOKEN) { console.error('Missing IG_USER_ID / IG_ACCESS_TOKEN secrets'); process.exit(1) }

async function api(path, params) {
  const body = new URLSearchParams({ ...params, access_token: IG_ACCESS_TOKEN })
  const res = await fetch(`${GRAPH}/${path}`, { method: 'POST', body })
  const json = await res.json()
  if (!res.ok || json.error) throw new Error(`${path}: ${JSON.stringify(json.error || json)}`)
  return json
}
async function status(id) {
  const res = await fetch(`${GRAPH}/${id}?fields=status_code,status&access_token=${IG_ACCESS_TOKEN}`)
  return res.json()
}
async function waitReady(id) {
  for (let i = 0; i < 40; i++) {
    const s = await status(id)
    if (s.status_code === 'FINISHED') return
    if (s.status_code === 'ERROR' || s.status_code === 'EXPIRED') throw new Error(`container ${id}: ${JSON.stringify(s)}`)
    await sleep(15000)
  }
  throw new Error(`container ${id} not ready after 10 minutes`)
}
const url = p => `${SITE}/${p.replace(/^\/?(public\/)?/, '')}`

async function main() {
  // make sure the media is actually live on the site before handing it to Instagram
  for (const m of post.media) {
    const r = await fetch(url(m), { method: 'HEAD' })
    if (!r.ok) throw new Error(`media not reachable yet: ${url(m)} (${r.status})`)
  }
  let creation
  if (post.type === 'reel') {
    creation = (await api(`${IG_USER_ID}/media`, { media_type: 'REELS', video_url: url(post.media[0]), caption: post.caption, share_to_feed: 'true' })).id
    await waitReady(creation)
  } else if (post.type === 'carousel') {
    const children = []
    for (const m of post.media) children.push((await api(`${IG_USER_ID}/media`, { image_url: url(m), is_carousel_item: 'true' })).id)
    for (const c of children) await waitReady(c)
    creation = (await api(`${IG_USER_ID}/media`, { media_type: 'CAROUSEL', children: children.join(','), caption: post.caption })).id
    await waitReady(creation)
  } else {
    creation = (await api(`${IG_USER_ID}/media`, { image_url: url(post.media[0]), caption: post.caption })).id
    await waitReady(creation)
  }
  const published = await api(`${IG_USER_ID}/media_publish`, { creation_id: creation })
  post.posted = { id: published.id, at: new Date().toISOString() }
  writeFileSync(file, JSON.stringify(post, null, 2) + '\n')
  log(`posted ${today} as ${published.id}`)
}

main().catch(e => {
  post.error = { message: String(e.message || e), at: new Date().toISOString() }
  writeFileSync(file, JSON.stringify(post, null, 2) + '\n')
  console.error(e)
  process.exit(1)
})
