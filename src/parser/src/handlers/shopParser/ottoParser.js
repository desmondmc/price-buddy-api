const request = require('request');
const cheerio = require('cheerio');
const parseDomain = require('parse-domain');
const currencyFormatter = require('currency-formatter');
const url_module = require('url');
const fs = require('fs');

var imgID = '#prd_mainProductImage';
var titleClass = '.prd_shortInfo__text';
var priceID = '#normalPriceAmount';
var reducedPriceID = '#reducedPriceAmount';

const imgAttribute = 'src';

const currency_mapping = {
  "de" : "EUR"
}

function get_currency (url){
  const tld = parseDomain(url).tld;
  return currency_mapping[tld];
}

//for otto we need 3 parts the product id which is more or less its name and the variationid, we have to track if that works allways
const clean_url = (url) => {
  const q = url_module.parse(url, true);
  return q.protocol+"//www."+q.hostname.replace("www.","")+q.pathname+q.hash;
}

const parse = (url_string) => {
  const currency = get_currency (url_string);
  request(url_string, function (error, response, html) {
     var parsed_data = { image : "", name : "", amount : "", currency : currency, shop: "Otto", url_string };

    /*fs.writeFile("test.html", html, function(err) {
    if(err) {
        return console.log(err);
    }

      console.log("The file was saved!");
    });*/

    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      $(titleClass).filter(function(){
        const data = $(this);
        parsed_data.name=data.children('h1').text().trim();
      })

      $(reducedPriceID).filter(function(){
        const data = $(this);
        parsed_data.amount=currencyFormatter.unformat(data.text(),{code : currency});
      })

      //if the proce is not reduced
      if(parsed_data.amount==""){
          $(priceID).filter(function(){
            const data = $(this);
            parsed_data.amount=currencyFormatter.unformat(data.text(),{code : currency});
          })
      }

      $(imgID).filter(function(){
        const data = $(this);
        parsed_data.image=data.attr(imgAttribute);
        })

      }

      console.log(JSON.stringify(parsed_data));
  })

}

module.exports = {
  parse: parse,
  cleanUrl: clean_url,
};
