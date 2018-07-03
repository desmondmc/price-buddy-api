//maybe needs a rebuild 
// http://docs.developer.amazonservices.com/en_CA/products/Products_GetMyPriceForSKU.html
/*
        To discuss automated access to Amazon data please contact api-services-support@amazon.com.
        For information about migrating to our APIs refer to our Marketplace APIs at https://developer.amazonservices.ca/ref=rm_5_sv, or our Product Advertising API at https://associates.amazon.ca/gp/advertising/api/detail/main.html/ref=rm_5_ac for advertising use cases.
*/

const request = require('request');
const cheerio = require('cheerio');
const parseDomain = require('parse-domain');
const currencyFormatter = require('currency-formatter');
const fs = require('fs');
const url_module = require('url');

const imgID = '#landingImage';
const multipleImageID = '#imgBlkFront';
const imgAttribute = 'data-old-hires';
const multipleImgAttribute = 'src';//no alternative because src doesnt work?
const titleID = '#productTitle';
const priceID = '#priceblock_ourprice';
const salePriceID = '#priceblock_saleprice';
const multiplePriceClass = '.a-color-price';

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


  /*const q = url_module.parse(url, true);
  const url_shop = q.host.replace('www.','');
  const pathname = q.pathname;
  if(pathname.includes('/gp/product/')){
    var str_start = pathname.indexOf('/gp/product/');
    var str_end = str_start+23;
  }else{
    var str_start = pathname.indexOf('/dp/');
    var str_end = str_start+15;
  }

  const url_product = pathname.substring(str_start,str_end);*/


  //for amazon we need the product id, but maybe we can in general just cut the other get parameters out of the url
  const url_string = url;
  const currency = get_currency (url_string);
  request(url_string, function (error, response, html) {
     var parsed_data = { image : "", name : "", amount : "", currency : currency, shop: "Amazon", url };

    /*fs.writeFile("test.html", html, function(err) {
    if(err) {
        return console.log(err);
    }

      console.log("The file was saved!");
    });*/

    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      $(titleID).filter(function(){
        const data = $(this);
        parsed_data.name=data.text().trim();
      })

      $(priceID).filter(function(){
        const data = $(this);
        //in case of on website price
        if(data.text()){
          parsed_data.amount=currencyFormatter.unformat(data.text(),{code : currency});
        }else{
          //multiple prices
          $(multiplePriceClass).filter(function(){
            const data = $(this);
            parsed_data.amount=currencyFormatter.unformat(data.text(),{code : currency});
          })
        }
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
