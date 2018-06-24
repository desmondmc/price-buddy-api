const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv')
const {
  deleteProduct,
  deleteUser,
  emailAvailability,
  getUserProducts,
  login,
  postLink,
  resendConfirmationEmail,
  signup,
} = require('./src/handlers')

const {
  bodyCheck,
  logger,
} = require('./src/middlewears');

env.config({ path: '.env' })

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())
app.use(logger)

app
  .get('/products', getUserProducts)
  .post('./login', login)
  .post('/signup', bodyCheck, signup)
  .post('/link', postLink)
  .post('/email-availability', emailAvailability)
  .post('/resend-confirmation-email', resendConfirmationEmail)
  .delete('/user', deleteUser)
  .delete('/product', deleteProduct)

app.listen(PORT, () => console.log('Listening on port:', PORT))