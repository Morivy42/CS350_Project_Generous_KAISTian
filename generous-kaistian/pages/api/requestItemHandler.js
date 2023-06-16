const client = require('../../components/dbConfig');
import { getServers } from "dns";
import { getServerSession } from "next-auth/next";

async function apply(userid, itemid, quantity, appeal) {
  query1(userid,itemid,quantity,appeal)
      .then(Request => {
          query2(Request.rows[0].requestid, userid, itemid)})
      .then(()=>{
        console.log("Request made")
      })
      .catch(err=>{
        console.error('Error making request', err.stack)
        throw new Error('Request Error')
      });
}

function query1(userid, itemid, quantity, appeal) {
  const q1 = `insert into Request(UserID, ItemID, Quantity, Appeal) values ($1, $2, $3, $4) returning RequestID`;
  const params = [userid, itemid, quantity, appeal];

  return client.query(q1,params);
}

function query2(RequestID, userid, itemid) {
  const updateTableUser = `update "User" set Requested_items = array_append(Requested_items, $1) where UserID = $2`;
  const updateTableItem = `update item set Requested_users = array_append(Requested_users, $1) where ItemID = $2`;
  // console.log(RequestID);

  return client.query(updateTableUser,[RequestID,userid])
      .then(()=>client.query(updateTableItem,[RequestID,itemid]));
}

export default async function RequestHandler(req, res) {
    const { userid, itemid, requestAmount, requestDescription } = req.body;
    // id_string = sessionStorage.getItem("userid");
    // userid = Number(id_string);
  
    // 폼 데이터 처리 로직
    // ...
    try {
      await apply(userid, itemid, requestAmount, requestDescription);
      res.status(200).send('OK')
    } catch (error) {
      res.status(401).send('Fail')
    }
    // 다른 페이지로 리디렉션
    // res.redirect(`../items/feed-items?userid=${userid}`);
  }