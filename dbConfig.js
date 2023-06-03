const { Client } = require('pg');

// Database connection configuration
const client = new Client({
  user: 'test',
  host: '127.0.0.1',
  database: 'cs350',
  password: '1234',
  port: 5432, // or your PostgreSQL port
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;