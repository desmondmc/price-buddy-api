const express = require('express')
const bodyParser = require('body-parser')

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
  authenticate,
} = require('./src/middlewears')

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())
app.use(logger)

app
  .get('/products', authenticate, getUserProducts)
  .post('/login', login)
  .post('/signup', bodyCheck, signup)
  .post('/link', authenticate, postLink)
  .post('/email-availability', emailAvailability)
  .post('/resend-confirmation-email', resendConfirmationEmail)
  .delete('/user', authenticate, deleteUser)
  .delete('/product', deleteProduct)

app.listen(PORT, () => console.log('Listening on port:', PORT))