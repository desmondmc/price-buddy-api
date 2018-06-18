/**
 * @api {post} /email-availability Verify that an email is available
 * @apiName Email Availability
 * @apiGroup Email
 *
 * @apiParam {String} email  email to check.
 *
 * @apiSuccess {Boolean} is_available
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "is_available": true
 *     }
 *
 */

const emailAvailability = (req, res) => {
  console.log('ran emailAvailability')
}

module.exports = emailAvailability;