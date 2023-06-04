const client = require('../../dbConfig');

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