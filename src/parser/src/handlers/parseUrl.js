const {
  AmazonParser,
  OttoParser,
} = require('./shopParser')

var url_string = require('url');

const parse = (url) => {
  var q = url_string.parse(url, true);
  var url_shop = q.host.replace('www.','');
  var pathname = q.pathname;
  var str_start = pathname.indexOf('/dp/');
  var str_end = str_start+15;
  var url_product = pathname.substring(str_start,str_end);

  AmazonParser(url_shop+url_product);
}

module.exports = parse;
