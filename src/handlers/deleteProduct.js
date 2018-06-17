/**
 * @api {delete} /product Product Delete
 * @apiName DeleteProduct
 * @apiGroup Product
 *
 * @apiParam {String} auth_token
 * @apiParam {String} product_id
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError InvalidProduct The passed product id was invalid
 * @apiError Unauthorized auth_token was non null and invalid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unauthorized"
 *     }
 */

const deleteProduct = (req, res) => {
  console.log('ran login')
}

module.exports = deleteProduct;