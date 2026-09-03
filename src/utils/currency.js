// All villa rates are maintained in USD in src/data/suites.js and converted
// to Costa Rican colones for display at this fixed rate.
export const USD_TO_CRC_RATE = 500

export function usdToColones(usdAmount) {
  return usdAmount * USD_TO_CRC_RATE
}

export function formatColones(usdAmount, locale = 'en-US') {
  return `₡${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(usdToColones(usdAmount))}`
}
