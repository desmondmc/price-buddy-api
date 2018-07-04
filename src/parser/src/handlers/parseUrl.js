const {
  AmazonParser,
  OttoParser,
} = require('./shopParser')

const url_module = require('url');

const supported_endings = [
  ".de",
  ".com.au",
  ".com.br",
  ".cn",
  ".fr",
  ".ca",
  ".in",
  ".it",
  ".com.mx",
  ".co.jp",
  ".nl",
  ".es",
  ".com",
  ".co.uk"]

const check_domain_ending = (domain,url) =>{
  //important to get the last appearance
  var tld_startpos = url.lastIndexOf(domain)+domain.length-1;
  var tld = url.substring(tld_startpos);
  if(supported_endings.includes(tld)){
    return true;
  }else{
    return false;
  }
}


const parse = (url) => {
  //if url doesn't contain https or http add it otherwise parse dont work
  if(!url.includes("http")){
    url = "https://"+url;
  }

  const q = url_module.parse(url, true);
  const shop_host = q.hostname;
  if(shop_host.includes('amazon') && check_domain_ending('amazon',shop_host)){
      AmazonParser(url);
  }
  else if(shop_host.includes('otto') &&  check_domain_ending('amazon',shop_host)){
      OttoParser(url);
  }
  else{
      console.log("this shop is not supported");
  }


}

module.exports = parse;
