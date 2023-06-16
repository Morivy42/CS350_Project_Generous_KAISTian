const client = require('../../components/dbConfig');
import { getServers } from "dns";
import { request } from "http";
import { getServerSession } from "next-auth/next";

function apply(userid, campaignid, requestDescription) {
    return query1(userid,campaignid,requestDescription)
        .then(Request => {
            query2(Request.rows[0].requestid, userid, campaignid)
        })
}

function query1(userid, campaignid, requestDescription) {
  const q1 = `insert into CampReq(UserID, itemid, Appeal) values ($1, $2, $3) returning RequestID`;
  const params = [userid, campaignid, requestDescription];

  return client.query(q1,params);
}

// update logic, need implementation
function query2(RequestID, userid, campaignid) {
  const updateTableUser = `update "User" set waiting_campaign = array_append(waiting_campaign, $1) where UserID = $2`;
  const updateTableCampaign = `update campaign set numpart = numpart + 1 where campaignid = $1`;
  // console.log(RequestID);

  return client.query(updateTableUser,[campaignid,userid])
      .then(()=>client.query(updateTableCampaign,[campaignid]));
}

export default async function RequestHandler(req, res) {
    const { userid, campaignid, requestDescription } = req.body;
    // id_string = sessionStorage.getItem("userid");
    // userid = Number(id_string);
  
    // 폼 데이터 처리 로직
    // ...
    apply(userid, campaignid, requestDescription)
    .then(()=>{
      res.status(200).send('OK')
    })
    .catch (err => {
        console.error('Error requesting campaign', err.stack)
        res.status(401).send('Fail')
    })
    // 다른 페이지로 리디렉션
    // res.redirect(`../items/feed-items?userid=${userid}`);
  }