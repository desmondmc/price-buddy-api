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

const getUserProducts = (req, res) => {
  console.log('Like totally posted a link')
}

module.exports = getUserProducts;