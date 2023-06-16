const { createTableUser } = require('./user.js');
const { createTableItem } = require('./item.js');
const { createTableRequest } = require('./request.js');
const { createTableCampaign } = require('./campaign.js');
const { createTableCampRequest } = require('./camp_req.js');

function createTables() {
    createTableUser();
    createTableItem();
    createTableRequest();
    createTableCampaign();
    createTableCampRequest();
}

module.exports = {createTables: createTables}
