import { useEffect } from 'react'
import { useLanguage, localizePathForLanguage } from '../../i18n/LanguageContext'

export const SITE_NAME = 'Villas Punta Uva'
export const SITE_URL = 'https://www.villaspuntauva.com'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero/arrecife-beach.webp`

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href, extraAttrs) {
  const selector = extraAttrs
    ? `link[rel="${rel}"][${Object.keys(extraAttrs)[0]}="${Object.values(extraAttrs)[0]}"]`
    : `link[rel="${rel}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (extraAttrs) {
      Object.entries(extraAttrs).forEach(([key, value]) => el.setAttribute(key, value))
    }
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// path is the language-neutral route (e.g. "/suites"); the current
// language's /es prefix (if any) is applied here so callers don't repeat it.
// title is the full page title (including the " | Villas Punta Uva" suffix)
// so each page controls its own title order and keyword placement.
export default function SEO({ title, description, path = '/', image = DEFAULT_OG_IMAGE, type = 'website', jsonLd }) {
  const { language } = useLanguage()
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    const enUrl = `${SITE_URL}${path}`
    const esUrl = `${SITE_URL}${localizePathForLanguage(path, 'es')}`
    const canonicalUrl = language === 'es' ? esUrl : enUrl

    document.title = title
    upsertMeta('name', 'description', description)
    upsertLink('canonical', canonicalUrl)
    upsertLink('alternate', enUrl, { hreflang: 'en' })
    upsertLink('alternate', esUrl, { hreflang: 'es' })
    upsertLink('alternate', enUrl, { hreflang: 'x-default' })

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', SITE_NAME)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    let script = null
    if (jsonLdKey) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = jsonLdKey
      document.head.appendChild(script)
    }

    return () => {
      if (script) script.remove()
    }
  }, [title, description, path, image, type, jsonLdKey, language])

  return null
}
