//      FINISHED: X

//      FROM: start/login.js
//      DATA: email, password
//      TRANSFER: query
//      FUNCTION: 전달받은 변수가 DB와 일치하는지 확인 후 일치하면 성공알림과 함께 feed-items로 리디렉션, 틀리면 실패알림과 함꼐 login으로 리디렉션
//      TO: items/feed-items.js
import client from '../../components/dbConfig';
// import { useRouter } from 'next/router';

export default async function LogInCheck(req, res) {
  const {email, password} = req.body;
  
  const query = `select * from "User" where email = $1 and password = $2`;
  client.query(query, [email, password])
      .then(result => {
          const exists = result.rows.length > 0;
          console.log(exists);
          if (exists) {
              res.status(200).json(result.rows[0]);
          } else {
              res.status(401).json({error: 'Invalid user'});
          }
      })
      .catch(err => {
          console.error('Error executing query:', err);
          res.status(500).json({error: 'An error occurred'});
      });
}