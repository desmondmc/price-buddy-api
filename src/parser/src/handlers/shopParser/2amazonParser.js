
var request = require('request');
var fs = require('fs');
var xpath = require('xpath');
var parse5 = require('parse5');
var xmlser = require('xmlserializer');
var dom = require('xmldom').DOMParser;

var imgID = 'landingImage';
var titleID = 'productTitle';
var priceID = 'priceblock_ourprice';
//one element inside another
//var xpath_ = '//x:div[@id="product_main_content"]/x:div[@class="price"]/text()';
var xpath_img = '//x:img[@id="landingImage"]/@src';
var xpath_title = '//x:span[@id="productTitle"]/text()';
var xpath_price = '//x:span[@id="priceblock_ourprice"]/text()';

var AmazonParser = function () {};

AmazonParser.prototype.parse = function () {

  request(this.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var document = parse5.parse(body.toString());
      var xhtml = xmlser.serializeToString(document);
      var doc = new dom().parseFromString(xhtml);
      var select = xpath.useNamespaces({"x": "http://www.w3.org/1999/xhtml"});
      //console.log(xhtml);
      fs.writeFile("test.txt", xhtml, function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
      }); 
      var node_img = select(xpath_img, doc);
      var node_title = select(xpath_title, doc);
      var node_price = select(xpath_price, doc);
      console.log(node_img[0].nodeValue.trim());
      console.log(node_title[0].nodeValue.trim());
      console.log(node_price[0].nodeValue.trim());
    }
  });
};


module.exports = new AmazonParser();
