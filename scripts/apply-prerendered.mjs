// Runs after `vite build` (see the "build" script in package.json).
//
// prerendered/ holds index.html snapshots committed by
// .github/workflows/prerender.yml (rendered on a GitHub-hosted runner,
// where Chromium installs reliably — see scripts/prerender.mjs for why
// this app needs prerendering at all). Those snapshots can be minutes to
// hours old by the time Vercel builds, so their <script>/<link> tags may
// reference asset filenames from an older build that no longer exist in
// this dist/.
//
// Rather than overwrite dist/'s freshly-built files wholesale (which would
// 404 the JS bundle for every visitor until the next prerender run catches
// up), this only grafts the crawler-relevant, content-only pieces — title,
// meta description, canonical/hreflang links, and the rendered #root
// markup — onto today's shell. Worst case if a snapshot is stale: a
// crawler sees slightly outdated text. The site itself never breaks.

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const PRERENDERED = path.join(ROOT, 'prerendered')
const SHELL_PATH = path.join(DIST, 'index.html')

async function walkIndexFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walkIndexFiles(full)))
    else if (entry.name === 'index.html') files.push(full)
  }
  return files
}

function replaceTag(html, regex, replacement) {
  return replacement ? html.replace(regex, replacement) : html
}

async function applyOne(prerenderedFile, shell) {
  const relative = path.relative(PRERENDERED, prerenderedFile)
  const distFile = path.join(DIST, relative)

  const snapshot = await readFile(prerenderedFile, 'utf-8')

  const rootMatch = snapshot.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/)
  if (!rootMatch) return { relative, skipped: 'no #root content found in snapshot' }

  let merged = shell.replace(
    /<div id="root">[\s\S]*<\/div>\s*<\/body>/,
    `<div id="root">${rootMatch[1]}</div>\n  </body>`,
  )

  merged = replaceTag(merged, /<title>[\s\S]*?<\/title>/, snapshot.match(/<title>[\s\S]*?<\/title>/)?.[0])
  merged = replaceTag(
    merged,
    /<meta name="description"[^>]*>/,
    snapshot.match(/<meta name="description"[^>]*>/)?.[0],
  )
  merged = replaceTag(
    merged,
    /<link rel="canonical"[^>]*>/,
    snapshot.match(/<link rel="canonical"[^>]*>/)?.[0],
  )

  await mkdir(path.dirname(distFile), { recursive: true })
  await writeFile(distFile, merged)
  return { relative, skipped: false }
}

async function main() {
  let files
  try {
    files = await walkIndexFiles(PRERENDERED)
  } catch {
    console.log('No prerendered/ directory found — dist/ stays as the plain SPA shell.')
    return
  }

  if (files.length === 0) {
    console.log('prerendered/ is empty — dist/ stays as the plain SPA shell.')
    return
  }

  // vite build only ever produces the one SPA entry file (dist/index.html);
  // that's the universal shell every route's merged output is built from,
  // since it always has today's correct asset hashes.
  let shell
  try {
    shell = await readFile(SHELL_PATH, 'utf-8')
  } catch {
    console.warn('dist/index.html not found — did `vite build` run first? Skipping.')
    return
  }

  let applied = 0
  for (const file of files) {
    const result = await applyOne(file, shell)
    if (result.skipped) console.warn(`  [skip] ${result.relative}: ${result.skipped}`)
    else applied++
  }
  console.log(`Applied ${applied}/${files.length} prerendered snapshot(s) onto dist/.`)
}

main().catch((err) => {
  console.error('apply-prerendered failed (leaving dist/ as the plain SPA build):', err)
})
