import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs'
import { mkdirSync } from 'fs'
mkdirSync('frames', { recursive: true })
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] })
const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 })
await p.goto('file://' + process.cwd() + '/video.html', { waitUntil: 'networkidle' })
await p.evaluate(() => document.fonts.ready)
await p.evaluate(() => document.getAnimations().forEach(a => a.pause()))
const FPS = 30, DUR = 18000
for (let f = 0; f * 1000 / FPS <= DUR; f++) {
  const t = f * 1000 / FPS
  await p.evaluate(t => {
    document.getAnimations().forEach(a => { a.currentTime = t })
    const s = t / 1000
    document.querySelectorAll('.scene, .card').forEach(el => {
      const a = +el.dataset.in, b = +el.dataset.out, f = 0.3
      let o = 0
      if (s >= a && s < b) o = Math.min(1, a === 0 ? 1 : (s - a) / f, (b - s) / f)
      el.style.opacity = Math.max(0, o)
    })
  }, t)
  await p.screenshot({ path: `frames/f${String(f).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 })
}
console.log('frames done'); await b.close()
