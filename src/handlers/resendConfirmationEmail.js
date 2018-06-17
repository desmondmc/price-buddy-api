/**
 * @api {post} /resend-confirmation-email Resend Confirmation Email
 * @apiName ResendConfimationEmail
 * @apiGroup Email
 *
 * @apiParam {String} email  email to resend.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError EmailDoesNotExist The provided email does not exist.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "EmailDoesNotExist"
 *     }
 */

const resendConfirmationEmail = (req, res) => {
  console.log('Like totally posted a link')
}

module.exports = resendConfirmationEmail;