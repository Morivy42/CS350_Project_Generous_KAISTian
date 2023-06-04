const client = require('../dbConfig.js');

// Create a table with a list attribute
function createTableItem() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Item (
        ItemId SERIAL PRIMARY KEY,
        Photo BYTEA,
        Name VARCHAR(20),
        Quantity INTEGER,
        Category varchar(20) NOT NULL,
        Description TEXT,
        Donator INTEGER NOT NULL REFERENCES "User"(UserID),
        Requested_Users INTEGER[],
        Confirmed_User INTEGER REFERENCES "User"(UserID),
        Rejected_Users INTEGER[],
        created_at TIMESTAMP,
        CONSTRAINT category_check CHECK (Category IN ('food', 'furniture', 'textbook', 'volunteer', 'etc'))
    );`;

  client.query(createTableQuery)
    .then(() => {
      console.log('Table created successfully');
      // client.end();
    })
    .catch(err => console.error('Error creating table item', err.stack));
  }

module.exports = { createTableItem: createTableItem }