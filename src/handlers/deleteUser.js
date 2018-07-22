/**
 * @api {delete} /user User Delete
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {String} auth_token
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
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

const deleteUser = async (req, res) => {
  if (!req.userId) {
    res.status(401).send('Unauthorized')
    return
  }

  await db.query(
    `
    DELETE FROM public.user
    WHERE id=$1
    `,
    [req.userId]
  )

  res.send()
}

module.exports = deleteUser