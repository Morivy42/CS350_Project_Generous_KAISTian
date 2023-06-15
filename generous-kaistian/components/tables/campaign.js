const client = require('../dbConfig.js');

// Create a table with a list attribute
function createTableCampaign() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Campaign (
            CampaignID SERIAL PRIMARY KEY,
            Name varchar(30),
            Quantity INTEGER,
            Description TEXT,
            Uploader INTEGER REFERENCES "User"(UserID),
            Waiting BOOLEAN
        );`;

    client.query(createTableQuery)
        .then(() => {
            console.log('Table created successfully');
            // client.end();
        })
        .catch(err => console.error('Error creating table campaign', err.stack));
    }

module.exports = {createTableCampaign: createTableCampaign}