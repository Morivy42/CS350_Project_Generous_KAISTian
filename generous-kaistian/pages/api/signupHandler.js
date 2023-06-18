//      FINISHED: X

//      FROM: start/signup.js
//      DATA: username, email, password, profileimage, contact
//      TRANSFER: formdata?
//      FUNCTION: 전달받은 변수를 통해 만든 새로운 계정정보를 DB에 추가, 성공하면 index로 리디렉션
//      TO: index.js
//      FINISHED: X

//      FROM: start/login.js
//      DATA: email, password
//      TRANSFER: query
//      FUNCTION: 전달받은 변수가 DB와 일치하는지 확인 후 일치하면 성공알림과 함께 feed-items로 리디렉션, 틀리면 실패알림과 함꼐 login으로 리디렉션
//      TO: items/feed-items.js
import client from '../../components/dbConfig';
// import { useRouter } from 'next/router';

export default async function SignupHander(req, res) {
  const {username, email, password, profileImage, contact} = req.body;
  
  const query = `insert into "User"(name, email, password, avatar, contact, nickname, id) values($1, $2, $3, $4, $5, $1, $2)`;
  const params = [username, email, password, profileImage, contact] 
  client.query(query, params)
    .then(()=>{
        res.status(200).send('Ok')
    })
    .catch(err => {
        console.error('Error in signup:', err);
        res.status(500).json({error: 'An error occurred'});
    });
}