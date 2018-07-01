
var request = require('request');
var cheerio = require('cheerio');
var crypto = require('crypto');
var fs = require('fs');

var imgID = '#landingImage';
var titleID = '#productTitle';
var priceID = '#priceblock_ourprice';
//one element inside another

function split_price_and_currency (price_and_currency){
  //need improvement its not universal
  var currency = price_and_currency.substring(0, 3);
  var price = price_and_currency.substring(4);
  return {
    currency: currency,
    price: price,
  };
}

const parse = (url) => {
  request('https://www.'+url, function (error, response, html) {
     var parsed_data = { image : "", name : "", amount : "", currency : "", shop: "Amazon", url };
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      $(titleID).filter(function(){
        var data = $(this);
        parsed_data.name=data.text().trim();
      })

      $(priceID).filter(function(){
        var data = $(this);
        var price_and_currency = data.text();
        parsed_data.currency=split_price_and_currency(price_and_currency).currency;
        parsed_data.amount=Number(split_price_and_currency(price_and_currency).price.replace(',','.'));
      })

      $(imgID).filter(function(){
        var data = $(this);
        //still getting something wrong, looks like image file header
        //we cant get the imge url https://stackoverflow.com/questions/39177793/src-pull-out-info-as-datagif-instead-of-direct-image-link
        //still not saving the actual picture just some dot
        //determine file automatically or use function which get it from string
        //var imagedata=data.attr('src').replace(/^data:image\/gif;base64,/, "");
        var imagepath=data.attr('data-old-hires');
        //var imagename=crypto.createHmac('sha256','our_secret_is_the_best').update( parsed_data.name+Math.random().toString()).digest('hex');
        //determine file extension automatically
        //var imagepath='parsed_images/'+imagename+'.gif';
        //fs.writeFile(imagepath, imagedata, 'base64', function(err){
          //  if (err) throw err
            //console.log('File saved.');
        //})
        /*fs.writeFile('test.html', html, function(err){
            if (err) throw err
            console.log('File saved.');
        })*/
        parsed_data.image=imagepath;
        })

      }
      console.log(parsed_data);
  })

}

module.exports = parse;
