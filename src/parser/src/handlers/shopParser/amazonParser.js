
const request = require('request');
const cheerio = require('cheerio');
const parseDomain = require('parse-domain');
const currencyFormatter = require('currency-formatter');

const imgID = '#landingImage';
const imgAttribute = 'data-old-hires';
const titleID = '#productTitle';
const priceID = '#priceblock_ourprice';

const currency_mapping = {
  "de" : "EUR",
  "com.au" : "AUD",
  "com.br" : "BRL",
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

function get_currency (url){
  const tld = parseDomain(url).tld;
  return currency_mapping[tld];
}

const parse = (url) => {
  const url_string = 'https://www.'+url;
  const currency = get_currency (url_string);
  request(url_string, function (error, response, html) {
     let parsed_data = { image : "", name : "", amount : "", currency : currency, shop: "Amazon", url };
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      $(titleID).filter(function(){
        const data = $(this);
        parsed_data.name=data.text().trim();
      })

      $(priceID).filter(function(){
        const data = $(this);
        parsed_data.amount=currencyFormatter.unformat(data.text(),{code : currency});
      })

      $(imgID).filter(function(){
        const data = $(this);
        parsed_data.image=data.attr(imgAttribute);
        })

      }

      console.log(JSON.stringify(parsed_data));
  })

}

module.exports = parse;
