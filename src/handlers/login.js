/**
 * @api {post} /login Login User
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} [verification_id]  Verification id from email confirmation
 * @apiParam {String} [email]  User email input.
 * @apiParam {String} [password]  Hash of user password input.
 *
 * @apiSuccess {String} auth_token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "auth_token": "some_auth_token"
 *     }
 *
 * @apiError InvalidEmailOrPassword The email password combination was invalid
 * @apiError InvalidVerificationId The verification id was invalid
 * @apiError TooManyAttempts Too many login attempts were made
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "InvalidEmailOrPassword"
 *     }
 */

const login = (req, res) => {
  console.log('ran login')
}

module.exports = login;