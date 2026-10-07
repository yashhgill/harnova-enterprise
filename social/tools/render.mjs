import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] })
const p = await b.newPage({ viewport: { width: 1200, height: 1500 }, deviceScaleFactor: 1 })
await p.goto('file://' + process.cwd() + '/carousel.html', { waitUntil: 'networkidle' })
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800)
for (const id of ['s1','s2','s3','s4','s5','pfp']) await (await p.$('#'+id)).screenshot({ path: `out/${id}.png` })
console.log('ok'); await b.close()
