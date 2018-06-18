const express = require('express')
const { Client } = require('pg')
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

env.config({ path: '.env' })

const db = new Client({
  connectionString: process.env.DATABASE_POSTGRES_URL,
  //connectionString: process.env.DATABASE_URL,
  ssl: false,
  //ssl: process.env.DATABASE_SSL,
});


db.connect()
  .then(() => db.query('SELECT * FROM price'))
    .then((result) => {
      //just a simple test query
      console.log(result.rows[0].amount)
      db.end();
    })
  .catch(() => {
    console.log('Failed to connect to DB')
  })

const PORT = process.env.PORT || 5000
const app = express()
app
  .get('/products', getUserProducts)
  .post('./login', login)
  .post('/signup', signup)
  .post('/link', postLink)
  .post('/email-availability', emailAvailability)
  .post('/resend-confirmation-email', resendConfirmationEmail)
  .delete('/user', deleteUser)
  .delete('/product', deleteProduct)

app.listen(PORT, () => console.log('Listening on port:', PORT))