const util = require('util')
const exec = util.promisify(require('child_process').exec)

const test_amazon = [{
  'country' : 'germany',
  'links' : [
    {
      'type': 'single_normal',
      'url': 'https://www.amazon.de/Metabo-Spezialfett-für-Werkzeugeinsteckende-631800000/dp/B00069LUUE/ref=pd_sim_60_6?_encoding=UTF8&pd_rd_i=B00069LUUE&pd_rd_r=ccaa9386-8b9c-11e8-af96-db152dcced4b&pd_rd_w=tuNdm&pd_rd_wg=TVzyh&pf_rd_i=desktop-dp-sims&pf_rd_m=A3JWKAKR8XB7XF&pf_rd_p=5296994838746851949&pf_rd_r=PWKGEWT6M8MV9R60XZ6Y&pf_rd_s=desktop-dp-sims&pf_rd_t=40701&psc=1&refRID=PWKGEWT6M8MV9R60XZ6Y'
    },
    {
      'type': 'single_reduced',
      'url': 'https://www.amazon.de/Bosch-3tlg-Meißel-Set-Long-SDS-plus/dp/B0014185DS/ref=pd_sim_60_3?_encoding=UTF8&pd_rd_i=B0014185DS&pd_rd_r=bf08964e-8b9c-11e8-ad3d-2f939966f5b8&pd_rd_w=BjzRe&pd_rd_wg=bfYAH&pf_rd_i=desktop-dp-sims&pf_rd_m=A3JWKAKR8XB7XF&pf_rd_p=5296994838746851949&pf_rd_r=4975CFRY9GKZGZYMRTF0&pf_rd_s=desktop-dp-sims&pf_rd_t=40701&psc=1&refRID=4975CFRY9GKZGZYMRTF0'
    },
    {
      'type': 'multiple_normal',
      'url': 'https://www.amazon.de/dp/B01N5TRMQA/ref=sspa_dk_detail_1?psc=1&pd_rd_i=B01N5TRMQA&pf_rd_m=A3JWKAKR8XB7XF&pf_rd_p=2444543729105426210&pf_rd_r=K78CW7T52ZP9R8V7WJ9K&pd_rd_wg=K0zQF&pf_rd_s=desktop-dp-sims&pf_rd_t=40701&pd_rd_w=3P1zM&pf_rd_i=desktop-dp-sims&pd_rd_r=0b3eee3a-8b9d-11e8-8f79-fb5c1ff68bd3'
    },
    {
      'type': 'multiple_reduced',
      'url': 'https://www.amazon.de/gp/product/B01LDZYN6C/ref=s9u_cartx_gw_i3?ie=UTF8&pd_rd_i=B01LDZYN6C&pd_rd_r=b3172f23-8b9c-11e8-a726-2b23c8770f65&pd_rd_w=13ceQ&pd_rd_wg=ktZ33&pf_rd_m=A3JWKAKR8XB7XF&pf_rd_s=&pf_rd_r=Z0SHTTXBPSB5ECQ3HFMV&pf_rd_t=36701&pf_rd_p=d50d6d36-3dff-4dc8-92b6-f340f287cf9f&pf_rd_i=desktop&th=1'
    }
  ]
},{
  'country' : 'usa',
  'links' : [
    {
      'type': 'single_normal',
      'url': 'https://www.amazon.com/Spigen-Flexible-Durable-Absorption-Motorola/dp/B079LS3T4T/ref=pd_sim_487_1?_encoding=UTF8&pd_rd_i=B079LS3T4T&pd_rd_r=QWVQ76NJFM0R08TA6A0R&pd_rd_w=Qkiyp&pd_rd_wg=9i6Ri&psc=1&refRID=QWVQ76NJFM0R08TA6A0R'
    },
    {
      'type': 'single_reduced',
      'url': 'https://www.amazon.com/Klipsch-Surround-Bookshelf-Speaker-R-14SA/dp/B073VV9TTK/ref=gbph_img_m-5_ebd7_5e555e58?smid=ATVPDKIKX0DER&pf_rd_p=46138d27-e18c-4cb4-b3b4-1e2ca6afebd7&pf_rd_s=merchandised-search-5&pf_rd_t=101&pf_rd_i=540734&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=69WDSJBW4BQBKKK2FYNT'
    },
    {
      'type': 'multiple_normal',
      'url': 'https://www.amazon.com/Goozler-Dunder-Mifflin-Company-T-Shirt/dp/B07CYCKGLW/ref=sr_1_10?s=apparel&ie=UTF8&qid=1532036968&sr=1-10&nodeID=7141123011&psd=1&keywords=t-shirt&th=1&psc=1'
    },
    {
      'type': 'multiple_reduced',
      'url': 'https://www.amazon.com/LG-G6-Unlocked-T-Mobile-Exclusive/dp/B06XYRS7CT/ref=gbph_img_m-6_8d35_a94e41d5?smid=ATVPDKIKX0DER&pf_rd_p=2a6afaaf-3f8c-4bc0-b150-e262d60f8d35&pf_rd_s=merchandised-search-6&pf_rd_t=101&pf_rd_i=2447856011&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=BVCGJM23DNWGQH2H0NEE&th=1'
    }
  ]
}]

const test_otto = [{
  'country' : 'germany',
  'links' : [
    {
      'type': 'single_normal',
      'url': 'https://www.otto.de/p/polar-fitness-tracker-weiss-a370-606864494/#variationId=606773878'
    },
    {
      'type': 'single_reduced',
      'url': 'https://www.otto.de/p/polaryte-sonnenbrillen-set-polaryte-set-537066929/#variationId=537068711'
    },
    {
      'type': 'multiple_normal',
      'url': 'https://www.otto.de/p/versace-sonnenbrille-ve2150q-590139587/#variationId=727259428'
    },
    {
      'type': 'multiple_reduced',
      'url': 'https://www.otto.de/p/heine-sneaker-503343470/#variationId=503346384'
    }
  ]
}]

const ShopMap = {
  'amazon': test_amazon,
  'otto': test_otto,
}

const run_parser = async (shopcountry,link) => {

  const { stdout, stderr, error } = await exec(`node ../src/parser/parser.js scrape ${link.url}`)

  if (error) {
    console.error(`exec error: ${error}`)
    return
  }

  let test_results = ''
  const { 
    image,
    name,
    amount,
    currency,
    shop,
    url
  } = JSON.parse(stdout)

  if(!image){
    test_results += '!no image;⚠️'
  }
  if(!name){
    test_results += '!no name;❌'
  }
  if(!amount){
    test_results += '!no amount;❌'
  }
  if(!currency){
    test_results += '!no currency;❌'
  }
  if(!shop){
    test_results += '!no shop;❌'
  }

  if(!test_results){
    test_results += 'test passed;✅'
  }
  console.log(shopcountry+'-'+link.type+':'+test_results)
}

const test_shop = (shoplist) =>{

  shoplist.forEach(function(shop){
    //why is this not working?
    ShopMap[shop].forEach(function(item){
      item.links.forEach(function(link) {
        run_parser(shop+'-'+item.country,link)
      })
    })
  })
}

test_shop(['otto','amazon'])



