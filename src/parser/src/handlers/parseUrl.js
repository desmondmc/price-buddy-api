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
  const tld_startpos = url.lastIndexOf(domain)+domain.length;
  const tld = url.substring(tld_startpos);
  if(supported_endings.includes(tld)){
    return true;
  }else{
    return false;
  }
}

const parse = (url,url_only=false) => {
  //if url doesn't contain https or http add it otherwise parse dont work
  if(!url.includes("http")){
    url = "https://"+url;
  }

  const q = url_module.parse(url, true);
  const shop_host = q.hostname;
  console.log(shop_host);
  if(shop_host.includes('amazon') && check_domain_ending('amazon',shop_host)){
      const clean_url = AmazonParser.cleanUrl(url);
      if(url_only){
        console.log("clean url:",clean_url);
      }else{
        AmazonParser.parse(clean_url);
      }
  }
  else if(shop_host.includes('otto') &&  check_domain_ending('otto',shop_host)){
    const clean_url = OttoParser.cleanUrl(url);
    if(url_only){
      console.log("clean url:",clean_url);
    }else{
      OttoParser.parse(clean_url);
    }
  }
  else{
      console.log("this shop is not supported");
  }


}

module.exports = parse;
