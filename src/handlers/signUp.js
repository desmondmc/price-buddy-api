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
 *     {
 *       "auth_token": "some_auth_token"
 *     }
 *
 * @apiError EmailAlreadyExists The email provided already has an account
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "EmailAlreadyExists"
 *     }
 */

const db = require('../db')
const uuid = require('uuid/v4')
const { now } = require('../utils/time')
const { saltPassword } = require('../utils/salter')

const signup = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).send('Missing email or password in request!')
    return;
  }

  if(await emailAlreadyExists(email)) {
    res.status(409).send({ error: 'EmailAlreadyExists' })
    return;
  }

  const {
    salt,
    hash,
    iterations,
  } = await saltPassword(password)

  const id = uuid()
  const authToken = uuid()

  const insertNewUser = 
    `
    INSERT INTO public.user 
    (id, email, auth_token, registration_date, last_login_date, password, salt, iterations) 
    VALUES 
    ('${id}','${email}', '${authToken}', '${now()}', '${now()}', '${hash}', '${salt}', ${iterations})
    `

  await db.query(insertNewUser)

  // TODO If there is a product id, create a relationship between the product and 

  res.send({
    auth_token: authToken,
  })
}

const emailAlreadyExists = async (email) => {
  const result = await db.query(`SELECT * FROM public.user where email='${email}'`)
  return result.rowCount > 0;
};

module.exports = signup;
