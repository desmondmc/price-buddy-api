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
  const { auth_token } = req.body

  await db.query(
    `
    DELETE FROM public.user
    WHERE auth_token='${auth_token}'
    `
  );

  res.send();
}

module.exports = deleteUser;