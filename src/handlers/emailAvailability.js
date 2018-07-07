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

const db = require('../db')

const emailAvailability = async (req, res) => {
  const { email } = req.body

  const result = await db.query(
    `
    SELECT * FROM public.user
    WHERE email='${email}'
    `
  )

  res.send({
    is_available: result.rowCount === 0,
  })
}

module.exports = emailAvailability