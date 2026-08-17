import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONFIG_PATH = path.join(__dirname, '..', 'airbnb-ical.config.json')
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'airbnbAvailability.json')

// Known suite slugs, checked against AIRBNB_ICAL_<SLUG> env vars when no local
// config file is present (e.g. in CI, where the gitignored config isn't checked out).
const KNOWN_SLUGS = [
  'villa-mariposa',
  'villa-tucan',
  'villa-presidente',
  'villa-colibri',
  'villa-angel',
  'villa-cacha',
  'carey-house',
]

function envVarName(slug) {
  return `AIRBNB_ICAL_${slug.toUpperCase().replace(/-/g, '_')}`
}

async function loadConfig() {
  const fileConfig = await readJson(CONFIG_PATH, null)
  if (fileConfig) return fileConfig

  const envConfig = {}
  for (const slug of KNOWN_SLUGS) {
    const value = process.env[envVarName(slug)]
    if (value) envConfig[slug] = value
  }
  return envConfig
}

function toIsoDate(icalDate) {
  // icalDate is YYYYMMDD
  return `${icalDate.slice(0, 4)}-${icalDate.slice(4, 6)}-${icalDate.slice(6, 8)}`
}

function parseIcal(text) {
  const ranges = []
  const events = text.split('BEGIN:VEVENT').slice(1)

  for (const event of events) {
    const startMatch = event.match(/DTSTART;VALUE=DATE:(\d{8})/)
    const endMatch = event.match(/DTEND;VALUE=DATE:(\d{8})/)
    if (!startMatch || !endMatch) continue

    ranges.push({
      start: toIsoDate(startMatch[1]),
      end: toIsoDate(endMatch[1]),
    })
  }

  return ranges
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, 'utf-8'))
  } catch {
    return fallback
  }
}

async function main() {
  const config = await loadConfig()

  if (Object.keys(config).length === 0) {
    console.error(
      `No iCal URLs found. Either copy airbnb-ical.config.example.json to airbnb-ical.config.json and fill in each villa's iCal export URL, or set AIRBNB_ICAL_<SLUG> environment variables (e.g. ${envVarName('villa-mariposa')}).`,
    )
    process.exitCode = 1
    return
  }

  const existing = await readJson(OUTPUT_PATH, {})
  const output = { ...existing }

  for (const [slug, url] of Object.entries(config)) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const text = await response.text()
      const ranges = parseIcal(text)
      output[slug] = ranges
      console.log(`${slug}: synced ${ranges.length} reserved date range(s)`)
    } catch (error) {
      console.error(`${slug}: failed to sync (${error.message}) — keeping previous data`)
    }
  }

  output.generatedAt = new Date().toISOString()

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n')
  console.log(`Wrote ${path.relative(process.cwd(), OUTPUT_PATH)}`)
}

main()
