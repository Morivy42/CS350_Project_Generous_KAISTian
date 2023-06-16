const { Client } = require('pg');

// Database connection configuration
const client = new Client({
  user: 'postgres',
  host: 'generous-kaistian-testdb.c2wnjmcl1kwe.ap-northeast-2.rds.amazonaws.com',
  database: 'testdb',
  password: ':0oXbKZqW0Uo2eYW3lXVH',
  port: 5432, // or your PostgreSQL port
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;