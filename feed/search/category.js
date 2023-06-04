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

function search_category(category) {
    const categoryquery = `select * from Item where category = $1`;
    const params = [category];

    client.query(categoryquery, params)
        .then(result => {
            const rows = result.rows;
            console.log('Search data retrieved:');
            rows.forEach(row=>{
                console.log(row.category);
            });
            client.end();
        })
        .catch(err => console.error('Error retrieving data', err.stack));
}

module.exports = {search_category: search_category}