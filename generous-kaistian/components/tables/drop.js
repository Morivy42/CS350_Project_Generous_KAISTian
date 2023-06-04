const client = require('../dbConfig.js');

function dropTables() {
    const dropQuery = `
    DROP TABLE IF EXISTS Request;
    DROP TABLE IF EXISTS Item;
    DROP TABLE IF EXISTS "User";
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