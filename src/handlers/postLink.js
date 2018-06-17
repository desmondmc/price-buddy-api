/**
 * @api {post} /link Post Product Link
 * @apiName PostLink
 * @apiGroup Link
 *
 * @apiParam {String} [auth_token]  Optional token sent if user is logged in.
 * @apiParam {String} link  Url of the product.
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
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UnsupportedShop"
 *     }
 */

const postLink = (req, res) => {
  console.log('Like totally posted a link')
}

module.exports = postLink;