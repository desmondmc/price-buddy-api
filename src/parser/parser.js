const { shopFromUrl } = require('./utils')

const sanitizerShopMap = {
  'amazon': require('./urlSanitizers/amazon'),
  'otto': require('./urlSanitizers/otto'),
}

const scraperShopMap = {
  'amazon': require('./scrapers/amazon'),
  'otto': require('./scrapers/otto'),
}

const sanitizeUrl = (url) => {
  const shop = shopFromUrl(url)
  if (shop === 'not_supported') {
    console.log("Shop not supported 😱")
    return
  }

  const sanitizer = sanitizerShopMap[shop]
  const cleanUrl = sanitizer(url)
  console.log(cleanUrl)
}

const scrapeProductData = (url) => {
  const shop = shopFromUrl(url)
  if (shop === 'not_supported') {
    console.log("Shop not supported 😱")
    return
  }

  const scraper = scraperShopMap[shop]
  const sanitizer = sanitizerShopMap[shop]
  const cleanUrl = sanitizer(url)
  scraper(cleanUrl)
}

const command = process.argv[2]
const url = process.argv[3]

switch (command) {
  case 'sanitize':
    sanitizeUrl(url)
    break;
  case 'scrape':
    scrapeProductData(url)
    break;
}