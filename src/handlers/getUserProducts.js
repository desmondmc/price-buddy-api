/**
 * @api {get} /products Get User's Products
 * @apiName GetProducts
 * @apiGroup Product
 *
 * @apiParam {String} auth_token
 *
 * @apiSuccess {Object[]} products
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "products": [
 *          {
 *            name: "iPhone",
 *            price: 3.44,
 *            image: "some-image-url.png",
 *            currency: "EUR"
 *          }
 *        ]
 *     }
 *
 * @apiError Unauthorized auth_token was non null and invalid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unauthorized"
 *     }
 */

const db = require('../db')

const getUserProducts = async (req, res) => {
  if (!req.userId) {
    res.status(401).send('Unauthorized')
    return
  }

  const userProducts = 
  `
    SELECT product.id, product.name, product.image, product.url, product.shop, price.amount, price.currency
    FROM product
    JOIN user_product_mapping
    ON user_product_mapping.product_id=product.id
    JOIN public.user
    ON public.user.id=user_product_mapping.user_id
    JOIN price
    ON price.product_id=product.id
    WHERE user_product_mapping.user_id=$1;
  `

  const result = await db.query(userProducts, [req.userId])

  const responseObject = result.rows.map(r => ({
    id: r.id,
    name: r.name,
    image: r.image,
    url: r.url,
    shop: r.shop,
    amount: r.amount,
    currency: r.currency,
  }))

  const jsonResponse = JSON.stringify(responseObject)
  res.send(jsonResponse)
}

module.exports = getUserProducts