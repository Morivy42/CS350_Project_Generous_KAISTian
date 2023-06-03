const client = require('../dbConfig.js');

  // Create a table with a list attribute
function createTableWithListAttribute() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "User" (
      UserID SERIAL PRIMARY KEY,
      Name varchar(20) NOT NULL,
      Nickname varchar(20) NOT NULL,
      Avatar BYTEA,
      Email varchar(20) UNIQUE,
      Contact integer,
      Id varchar(20) UNIQUE NOT NULL,
      Password TEXT,
      Notification TEXT[],
      Donation_info integer[],
      Donated_items integer[],
      Donating_items integer[],
      Requested_items integer[],
      Waiting_campaign integer[],
      Campaigns integer[],
      CHECK (email like '%@kaist.ac.kr'),
      CHECK (array_length(Donated_item, 1) = 2)
    );`;
    
    client.query(createTableQuery)
      .then(() => {
        console.log('Table created successfully');
        client.end();
      })
      .catch(err => console.error('Error creating table', err.stack));
}

createTableWithListAttribute();