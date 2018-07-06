const request = require('request')
const cheerio = require('cheerio')
const parseDomain = require('parse-domain')
const currencyFormatter = require('currency-formatter')

const imgID = '#landingImage'
const imgAttribute = 'data-old-hires'
const titleID = '#productTitle'
const priceID = '#priceblock_ourprice'
const multiplePriceClass = '.a-color-price'

const currencyMapping = {
  "de" : "EUR",
  "com.au" : "AUD",
  "com.br" : "BRL",
  "co.uk" : "GBP",
  "cn" : "CNY",
  "fr" : "EUR",
  "ca" : "CAD",
  "in" : "INR",
  "it" : "EUR",
  "com.mx" : "MXN",
  "co.jp" : "JPY",
  "nl" : "EUR",
  "es" : "EUR",
  "com" : "USD"
}

const getCurrency = (url) =>{
  const tld = parseDomain(url).tld
  return currencyMapping[tld]
}

const parse = (url) => {
  //for amazon we need the product id, but maybe we can in general just cut the other get parameters out of the url
  const url_string = url
  const currency = getCurrency(url_string)
  request(url_string, function (error, response, html) {
     const parsed_data = { image : "", name : "", amount : "", currency : currency, shop: "Amazon", url }
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html)

      $(titleID).filter(() => {
        const data = $(this)
        parsed_data.name=data.text().trim()
      })

      $(priceID).filter(() => {
        const data = $(this)
        //in case of on website price
        if (data.text()) {
          parsed_data.amount=currencyFormatter.unformat(data.text(),{code : currency})
        } else {
          //multiple prices
          $(multiplePriceClass).filter(() => {
            const data = $(this)
            parsed_data.amount=currencyFormatter.unformat(data.text(),{code : currency})
          })
        }
      })

      $(imgID).filter(() => {
        const data = $(this)
        parsed_data.image=data.attr(imgAttribute)
      })

    }

    console.log(JSON.stringify(parsed_data))
  })

}

module.exports = parse;