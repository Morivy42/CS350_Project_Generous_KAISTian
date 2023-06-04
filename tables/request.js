const client = require('../dbConfig.js');

  // Create a table with a list attribute
function createTableRequest() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Request (
      RequestID serial primary key,
      UserID integer references "User"(UserID),
      ItemID integer references Item(ItemID),
      Quantity integer,
      Appeal TEXT
    );`;
    
    client.query(createTableQuery)
      .then(() => {
        console.log('Table created successfully');
        // client.end();
      })
      .catch(err => console.error('Error creating table', err.stack));
}

module.exports = {createTableRequest: createTableRequest}