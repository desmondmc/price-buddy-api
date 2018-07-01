
var request = require('request');
var cheerio = require('cheerio');

var imgID = '#prd_mainProductImage';
var titleClass = '.prd_shortInfo__text';
var priceClass = '.prd_price__amount';
//one element inside another

var OttoParser = function () {};

function split_price_and_currency (price_and_currency){
  //need improvement its not universal
  var currency = price_and_currency.substring(0, 1);
  var price = price_and_currency.substring(2);
  return {
    currency: currency,
    price: price,
  };
}

OttoParser.prototype.parse = function () {


  request(this.url, function (error, response, html) {
    var parsed_data = { img_src : "", name : "", price : "", currency : ""};
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      $(imgID).filter(function(){
        var data = $(this);
        //still getting something wrong, looks like image file header
        parsed_data.img_src=base64_decode(str_replace('data:image/gif;base64,','',data.attr('src')));
      })

      $(titleClass).filter(function(){
        var data = $(this);
        parsed_data.name=data.children().first().text().trim();
      })

      $(priceClass).filter(function(){
        var data = $(this);
        var price_and_currency = data.text().trim();
        parsed_data.currency=split_price_and_currency(price_and_currency).currency;
        parsed_data.price=split_price_and_currency(price_and_currency).price;
      })
    }
    console.log(parsed_data);
  });
};


module.exports = new OttoParser();