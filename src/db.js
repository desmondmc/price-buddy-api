const { Client } = require('pg');

const db = new Client({
  connectionString: process.env.DATABASE_POSTGRES_URL,
  //connectionString: 'postgresql://localhost/price_buddy?user=desmondmcnamee',
  ssl: false,
  //ssl: process.env.DATABASE_SSL,
});

db.connect()
  .catch((err) => {
    console.log('Failed to connect to DB: ', err);
  })

module.exports = db;