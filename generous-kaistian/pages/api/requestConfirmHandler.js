const client = require('../../components/dbConfig');
import { getServers } from "dns";
import { getServerSession } from "next-auth/next";

async function apply(userid, itemid) {
    
  query1(userid,itemid)
      .then(() => {
          query2(userid, itemid)})
      .then(()=>{
        console.log("Request Confirmed")
      })
      .catch(err=>{
        console.error('Error making confirm', err.stack)
        throw new Error('Request Error')
      });
}

function query1(userid, itemid) {
  const q1 = `UPDATE "request" SET status = 2 WHERE userid <> $1 AND itemid = $2`;
  const params = [userid, itemid];

  return client.query(q1, params);
}

function query2(userid, itemid) {
  const updateTableUser = `UPDATE "request" SET status = 1 WHERE userid = $1 AND itemid = $2 ;`;
  // console.log(RequestID);
  const params = [userid, itemid];

  return client.query(updateTableUser, params);
}

export default async function confirmHandler(req, res) {
    //console.log("fffffffffffffffffffff")
    const {ch_user_id, itemid} = req.body;
    // id_string = sessionStorage.getItem("userid");
    // userid = Number(id_string);
  
    // 폼 데이터 처리 로직
    // ...
    console.log("nicecnienic")
    try {
      await apply(ch_user_id, itemid);
      res.status(200).send('OK')
    } catch (error) {
      res.status(401).send('Fail')
    }
    // 다른 페이지로 리디렉션
    // res.redirect(`../items/feed-items?userid=${userid}`);
  }