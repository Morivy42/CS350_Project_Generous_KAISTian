const client = require('../dbConfig.js');

function dropTables() {
    const dropQuery = `
    DROP TABLE IF EXISTS Request cascade;
    DROP TABLE IF EXISTS CampReq cascade;
    DROP TABLE IF EXISTS Campaign cascade;
    DROP TABLE IF EXISTS Item cascade;
    DROP TABLE IF EXISTS "User" cascade;
    `;
    
    client.query(dropQuery)
        .then(() => {
            console.log('Tables dropped successfully');
            // client.end();
        })
    .catch(err => console.error('Error dropping tables', err.stack));
}

module.exports = {dropTables: dropTables}
// dropTables();