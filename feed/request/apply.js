const client = require('../../dbConfig.js');

function apply(userid, itemid, quantity, appeal) {
    query1(userid,itemid,quantity,appeal)
        .then(Request => {
            query2(Request.rows[0].requestid, userid, itemid)})
        .then(()=>console.log("Request made"))
        .catch(err=>console.error('Error making request', err.stack));
}

function query1(userid, itemid, quantity, appeal) {
    const q1 = `insert into Request(UserID, ItemID, Quantity, Appeal) values ($1, $2, $3, $4) returning RequestID`;
    const params = [userid, itemid, quantity, appeal];

    return client.query(q1,params);
}

function query2(RequestID, userid, itemid) {
    const updateTableUser = `update "User" set Requested_items = array_append(Requested_items, $1) where UserID = $2`;
    const updateTableItem = `update item set Requested_users = array_append(Requested_users, $1) where ItemID = $2`;
    console.log(RequestID);

    return client.query(updateTableUser,[RequestID,userid])
        .then(()=>client.query(updateTableItem,[RequestID,itemid]));
}

module.exports = {apply: apply}