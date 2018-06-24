const { Client } = require('pg');
const env = require('dotenv')

env.config({ path: '.env' })

const db = new Client({
  connectionString: process.env.DATABASE_POSTGRES_URL,
  ssl: (process.env.DATABASE_SSL === 'true'),
});

db.connect()
  .catch((err) => {
    console.log('Failed to connect to DB: ', err);
  })

module.exports = db;