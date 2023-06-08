const { createTableUser } = require('./user.js');
const { createTableItem } = require('./item.js');
const { createTableRequest } = require('./request.js');
const { createTableCampaign } = require('./campaign.js');

function createTables() {
    createTableUser();
    createTableItem();
    createTableCampaign();
    createTableRequest();
}

module.exports = {createTables: createTables}
