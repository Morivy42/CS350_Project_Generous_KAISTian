const { dropTables } = require('./drop.js');
const { createTables } = require('./create.js');

const client = require('../dbConfig.js');

function truncate() {
    const truncquery = `
    TRUNCATE TABLE "User" cascade;
    ` 
    
    client.query(truncquery)
        .then(()=> {
            console.log('Successful trunc');
    })
    .catch(err => console.error('Error trunc'));
}

function init_tables() {
    init_user();
    init_item();
}
function init_user() {
    const insertquery = `
    insert into "User"(Name, Nickname, Email, Id, password) values (1,1,'1@kaist.ac.kr',1, 1)
    `;

    client.query(insertquery)
        .then(()=> {
            console.log('Successful insertion into user');
    })
    .catch(err => console.error('Error inserting into User'));
}
function init_item() {
    const insertquery = `
    insert into Item(name, category, donator) values(111, 'etc', (select UserID from "User" limit 1))
    `;

    client.query(insertquery)
        .then(()=> {
            console.log('Successful insertion into item');
            // client.end();
    })
    .catch(err => console.error('Error inserting into item'));
}

function init_req() {

}

function init_camp() {
    
}

function init() {
    dropTables();
    createTables();
    // truncate();
    init_tables();
}

module.exports = {init: init}