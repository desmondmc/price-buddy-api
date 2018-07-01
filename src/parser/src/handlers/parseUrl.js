const {
  AmazonParser,
  OttoParser,
} = require('./shopParser')

const url_string = require('url');

const parse = (url) => {
  const q = url_string.parse(url, true);
  const url_shop = q.host.replace('www.','');
  const pathname = q.pathname;
  if(pathname.includes('/gp/product/')){
    var str_start = pathname.indexOf('/gp/product/');
    var str_end = str_start+23;
  }else{
    var str_start = pathname.indexOf('/dp/');
    var str_end = str_start+15;
  }

  const url_product = pathname.substring(str_start,str_end);
  AmazonParser(url_shop+url_product);
}

module.exports = parse;
