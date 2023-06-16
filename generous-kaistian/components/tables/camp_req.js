const client = require('../dbConfig.js');

  // Create a table with a list attribute
function createTableCampRequest() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS CampReq (
      RequestID serial primary key,
      UserID integer references "User"(UserID),
      ItemID integer references Campaign(CampaignID),
      Appeal TEXT
    );`;
    
    client.query(createTableQuery)
      .then(() => {
        console.log('Table created successfully');
        // client.end();
      })
      .catch(err => console.error('Error creating table', err.stack));
}

module.exports = {createTableCampRequest: createTableCampRequest}