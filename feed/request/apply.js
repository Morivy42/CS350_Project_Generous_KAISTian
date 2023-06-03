const client = require('../../dbConfig.js');

function apply(userid, itemid, quantity, appeal) {
    const insertquery = `insert into Request(UserID, ItemID, Quantity, Appeal) values ($1, $2, $3, $4)`;
    const params = [userid, itemid, quantity, appeal];

    client.query(insertquery,params)
        .then(()=> {
            console.log('Made Request successfully');
            const inserted = `select RequestID from Request where (UserID, ItemID, Quantity, Appeal) = ($1, $2, $3, $4)`;
            client.query(inserted, params)
                .then(result=> {return result.rows[0]})
                .then(RequestID => {
                    const updateTableUser = `update "User" set Requested_items = Requested_items || RequestID where UserID = $1`;
                    
                });
            client.end();
        })
        .catch(err=>console.error('Error making request', err.stack));
}

module.exports = {apply: apply}