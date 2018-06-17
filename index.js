const express = require('express')
const app = express()
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

await client.connect();

const PORT = process.env.PORT || 5000
app.get('/', (req, res) => res.send('Welcome to Price Buddy!'))
app.listen(PORT, () => console.log('Listening on port:', PORT))