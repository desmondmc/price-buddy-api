const {
  AmazonParser,
  OttoParser,
} = require('./shopParser')

const url_module = require('url');

const parse = (url) => {
  //if url doesn't contain https or http add it otherwise parse dont work
  if(!url.includes("http")){
    url = "https://"+url;
  }
  const q = url_module.parse(url, true);
  const shop_name = q.hostname;
  //can cause problems as well if someone has e.g. amazon as subdomain -> maybe find another library which gets just the name
  if(shop_name.includes('amazon')){
      AmazonParser(url);
  }
  else if(shop_name.includes('otto')){
      OttoParser(url);
  }
  else{
      console.log("this shop is not supported");
  }


}

module.exports = parse;
