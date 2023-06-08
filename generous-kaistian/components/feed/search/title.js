const client = require('../../dbConfig');

function search_title(title) {
    const titlequery = `select * from Item where name like $1`;
    const params = ['%'+title+'%'];

    client.query(titlequery, params)
        .then(result => {
            const rows = result.rows;
            console.log('Search data retrieved:');
            return rows;
        })
        .catch(err => console.error('Error retrieving data', err.stack));
}

module.exports = {search_title: search_title}