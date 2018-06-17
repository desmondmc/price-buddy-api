const express = require('express')
const app = express()
const { Client } = require('pg');

require('dotenv').config({ path: '.env' })

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect()
  .then(() => {
    console.log('Connected to DB')
  })
  .catch(() => {
    console.log('Failed to connect to DB')
  })

const PORT = process.env.PORT || 5000
app.get('/', (req, res) => res.send('Welcome to Price Buddy!'))
app.listen(PORT, () => console.log('Listening on port:', PORT))