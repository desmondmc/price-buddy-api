const express = require('express')
const app = express()
const { Client } = require('pg');
const postLink = require('./src/handlers/postLink')

require('dotenv').config({ path: '.env' })

const client = new Client({
  connectionString: process.env.DATABASE_POSTGRES_URL,
  //connectionString: process.env.DATABASE_URL,
  ssl: false,
  //ssl: process.env.DATABASE_SSL,
});


client.connect()
  .then(() => client.query('SELECT * FROM price'))
    .then((result) => {
      //just a simple test query
      console.log(result.rows[0].amount)
      client.end();
    })
  .catch(() => {
    console.log('Failed to connect to DB')
  })

const PORT = process.env.PORT || 5000
app
  .post('/link', postLink)

app.listen(PORT, () => console.log('Listening on port:', PORT))