const client = require('../../components/dbConfig');

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
  // console.log(RequestID);

  return client.query(updateTableUser,[RequestID,userid])
      .then(()=>client.query(updateTableItem,[RequestID,itemid]));
}

export default function RequestHandler(req, res) {
    // userid는 세션에서 가져올 것; 아래 코드 주석 변경하기
    // const { userid, itemid, amount, request } = req.query;
    const { itemid, amount, request } = req.query;
    id_string = sessionStorage.getItem("userid");
    userid = Number(id_string);
  
    // 폼 데이터 처리 로직
    // ...
    apply(userid, itemid, amount, request);
    // 다른 페이지로 리디렉션
    res.redirect('/../feed');
  }