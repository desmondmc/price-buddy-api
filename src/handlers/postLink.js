/**
 * @api {post} /link Post Product Link
 * @apiName PostLink
 * @apiGroup Link
 *
 * @apiParam {String} [auth_token]  Optional token sent if user is logged in.
 * @apiParam {String} link Url of the product.
 *
 * @apiSuccess {String} product_id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "product_id": "some_product_id"
 *     }
 *
 * @apiError UnsupportedShop The link was a shop that we don't support
 * @apiError UnparseableLink The passed link was unparseable
 * @apiError Unauthorized auth_token was non null and invalid
 * @apiError ShopRequestFailure the request to the shop failed
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UnsupportedShop"
 *     }
 */

const uuid = require('uuid/v4')
const moment = require('moment')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const db = require('../db')

const postLink = async (req, res) => {
  const { link } = req.body

  try {
    const { stdout, stderr } = await exec(`node ./src/parser/parser.js scrape ${link}`)

    if (stderr) {
      console.log(stderr)
      res.status(406).send({ error: 'UnparseableLink' })
      return
    }

    const {
      image,
      name,
      amount,
      currency,
      shop,
      url
    } = JSON.parse(stdout)

    const productId = uuid()
    const priceId = uuid()
    const userId = req.userId
    const userProductMappingId = uuid()

    const now = moment().format()


    const insertProduct = {
      text:
        `
        INSERT INTO product 
        (id, name, url, image, shop) 
        VALUES 
        ($1,$2,$3,$4,$5);
        `,
      values: [productId, name, url, image, shop],
    }

    const insertPrice = {
      text:
        `
        INSERT INTO price
        (id, amount, currency, created, product_id) 
        VALUES 
        ($1,$2,$3,$4,$5);
        `,
      values: [priceId, amount, currency, now, productId],
    }

    const insertUserProductMapping = {
      text:
        `
        INSERT INTO user_product_mapping
        (id, user_id, product_id, created) 
        VALUES 
        ($1,$2,$3,$4);
        `,
      values: [userProductMappingId, userId, productId, now]
    }

    try {
      await db.query('BEGIN')
      await db.query(insertProduct)
      await db.query(insertPrice)
      await db.query(insertUserProductMapping)
      await db.query('COMMIT')
    } catch(e) {
      console.log('Error saving link to db: ', e)
      await db.query('ROLLBACK')
      throw e
    }

    res.send({ product_id: productId })
  } catch (e) {
    console.log('Error saving link: ', e)
    res.status(500).send({ error: 'ShopRequestFailure' })
  }
}

const _insertProductWithUser = ({

}) => {

}

module.exports = postLink
