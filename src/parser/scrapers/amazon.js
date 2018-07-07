const request = require('request')
const cheerio = require('cheerio')
const parseDomain = require('parse-domain')
const currencyFormatter = require('currency-formatter')
// we need this for debugging
//var fs = require('fs');

const imgID = '#landingImage'
const imgAttribute = 'data-old-hires'
const titleID = '#productTitle'
const priceID = '#priceblock_ourprice'
const multiplePriceClass = '.a-color-price'

const currencyMapping = {
  'de' : 'EUR',
  'com.au' : 'AUD',
  'com.br' : 'BRL',
  'co.uk' : 'GBP',
  'cn' : 'CNY',
  'fr' : 'EUR',
  'ca' : 'CAD',
  'in' : 'INR',
  'it' : 'EUR',
  'com.mx' : 'MXN',
  'co.jp' : 'JPY',
  'nl' : 'EUR',
  'es' : 'EUR',
  'com' : 'USD'
}

const getCurrency = (url) =>{
  const tld = parseDomain(url).tld
  return currencyMapping[tld]
}

const parse = (url) => {
  //for amazon we need the product id, but maybe we can in general just cut the other get parameters out of the url
  const currency = getCurrency(url)
  request(url, function (error, response, html) {
    var parsed_data = { image : '', name : '', amount : '', currency : currency, shop: 'Amazon', url }

    // we need this for debugging
    /*
    fs.writeFile("test.html", html, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    });*/

    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)

      $(titleID).filter(function(){
        const data = $(this)
        parsed_data.name=data.text().trim()
      })

      $(priceID).filter(function(){
        const data = $(this)
        //in case of on website price
        if (data.text()) {
          parsed_data.amount=currencyFormatter.unformat(data.text(),{code : currency})
        } else {
          //multiple prices
          $(multiplePriceClass).filter(function(){
            const data = $(this)
            parsed_data.amount=currencyFormatter.unformat(data.text(),{code : currency})
          })
        }
      })

      $(imgID).filter(function(){
        const data = $(this)
        parsed_data.image=data.attr(imgAttribute)
      })

    }

    console.log(JSON.stringify(parsed_data))
  })

}

module.exports = parse