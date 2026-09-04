// Runs after `vite build` (see the "build" script in package.json).
//
// This app is a client-side React SPA: `vite build` alone produces a
// dist/index.html whose <body> is just <div id="root"></div>, with all real
// content injected by React after JavaScript runs. Search/AI crawlers that
// don't execute JavaScript (GPTBot, ClaudeBot, PerplexityBot, CCBot, and
// others) see nothing but that empty shell.
//
// To fix that without leaving React + Vite, this script boots the built
// site with Vite's own preview server, opens every real content URL in a
// headless browser, lets the app fully render (including the SEO.jsx title/
// meta/canonical tags, which are set via useEffect + DOM APIs and so only
// exist once JS has actually run), and saves the resulting HTML into dist/
// at the matching path (e.g. dist/explore/index.html). Real visitors still
// load the same JS bundle and get the exact same interactive app as today —
// this only changes what a non-JS crawler sees on first request.
//
// Routes mirror src/App.jsx's `routes` array. Suite slugs mirror
// KNOWN_SLUGS in scripts/sync-availability.mjs. If a villa or a top-level
// page is ever added or removed, update this list too.

import { preview } from 'vite'
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIST = path.join(ROOT, 'dist')

const BASE_PATHS = ['/', '/suites', '/location', '/about', '/explore', '/contact', '/faq']

const SUITE_SLUGS = [
  'villa-mariposa',
  'villa-tucan',
  'villa-presidente',
  'villa-colibri',
  'villa-angel',
  'villa-cacha',
  'carey-house',
]

const ALL_PATHS = [...BASE_PATHS, ...SUITE_SLUGS.map((slug) => `/suites/${slug}`)]

function localize(pathName, language) {
  if (language !== 'es') return pathName
  return pathName === '/' ? '/es' : `/es${pathName}`
}

function outputFile(urlPath) {
  const clean = urlPath === '/' ? '' : urlPath
  return path.join(DIST, clean, 'index.html')
}

// Scrolls the full page height in steps so native loading="lazy" images and
// the IntersectionObserver-driven carousels (SuitesGallery, Reviews,
// PhotoCarousel) get a chance to fire before we capture the DOM, then
// returns scroll position to the top before the snapshot is taken.
async function triggerLazyContent(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      const step = Math.max(200, Math.floor(window.innerHeight * 0.8))
      let total = 0
      const timer = setInterval(() => {
        window.scrollBy(0, step)
        total += step
        if (total >= document.body.scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  })
  await page.waitForTimeout(300)
  await page.evaluate(() => window.scrollTo(0, 0))
}

async function main() {
  const server = await preview({
    root: ROOT,
    preview: { port: 4173 },
    logLevel: 'warn',
  })
  const base = server.resolvedUrls.local[0].replace(/\/$/, '')
  console.log(`Preview server running at ${base}`)

  const browser = await chromium.launch()
  const page = await browser.newPage()

  const routes = []
  for (const p of ALL_PATHS) {
    for (const lang of ['en', 'es']) {
      routes.push(localize(p, lang))
    }
  }

  console.log(`Prerendering ${routes.length} routes...\n`)
  const failures = []

  for (const urlPath of routes) {
    try {
      await page.goto(`${base}${urlPath}`, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForSelector('main#main-content', { state: 'attached', timeout: 10000 })

      await triggerLazyContent(page)
      await page.waitForLoadState('networkidle', { timeout: 15000 })

      const title = await page.title()
      const description = await page
        .$eval('meta[name="description"]', (el) => el.getAttribute('content'))
        .catch(() => null)
      const rootHTML = await page.$eval('#root', (el) => el.innerHTML).catch(() => '')

      if (!title || !description || rootHTML.length < 200) {
        throw new Error(
          `page looks empty or incomplete (title="${title}", description="${description}", rendered content length=${rootHTML.length})`,
        )
      }

      const html = await page.content()
      const file = outputFile(urlPath)
      await mkdir(path.dirname(file), { recursive: true })
      await writeFile(file, html)

      console.log(`  [ok]   ${urlPath}`)
      console.log(`         title: ${title}`)
      console.log(`         desc:  ${description.slice(0, 90)}${description.length > 90 ? '…' : ''}`)
    } catch (err) {
      failures.push({ urlPath, error: err.message })
      console.error(`  [FAIL] ${urlPath}: ${err.message}`)
    }
  }

  await browser.close()
  await server.close()

  if (failures.length > 0) {
    console.error(`\nPrerendering failed for ${failures.length}/${routes.length} route(s):`)
    for (const f of failures) console.error(`  - ${f.urlPath}: ${f.error}`)
    process.exit(1)
  }

  console.log(`\nPrerendered ${routes.length}/${routes.length} routes successfully.`)
}

main().catch((err) => {
  console.error('Prerendering failed:', err)
  process.exit(1)
})
