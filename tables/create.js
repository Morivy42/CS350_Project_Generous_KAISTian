const { createTableUser } = require('./user.js');
const { createTableItem } = require('./item.js');
const { createTableRequest } = require('./request.js');

function createTables() {
    createTableUser();
    createTableItem();
    createTableRequest();
}

module.exports = {createTables: createTables}
// createTables();
