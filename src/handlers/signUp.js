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

const db = require('../db')
const { saltPassword } = require('../utils/salter')

const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Missing email or password in request!')
  }

  await emailAlreadyExists(email)

  const {
    salt,
    hash,
    iterations,
  } = await saltPassword(password);

  // create a new user and store him in the database.

  // If there is a product id, create a relationship between the product and 

  res.send(salt)
}

const emailAlreadyExists = async (email) => {
  // const result = await db.query(`SELECT * FROM user where email=${email}`)

  return false;
};

module.exports = signup;