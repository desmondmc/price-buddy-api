/**
 * @api {post} /signup Signup User
 * @apiName SignupUser
 * @apiGroup User
 *
 * @apiParam {String} email  User email.
 * @apiParam {String} password  Password hashed.
 * @apiParam {String} [product_id]  Optional initial product_id.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError EmailAlreadyExists The email provided already has an account
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "EmailAlreadyExists"
 *     }
 */

const signup = (req, res) => {
  console.log('Like totally posted a link')
}

module.exports = signup;