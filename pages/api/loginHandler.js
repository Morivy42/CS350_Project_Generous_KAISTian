//      FINISHED: X

//      FROM: start/login.js
//      DATA: email, password
//      TRANSFER: query
//      FUNCTION: 전달받은 변수가 DB와 일치하는지 확인 후 일치하면 성공알림과 함께 feed-items로 리디렉션, 틀리면 실패알림과 함꼐 login으로 리디렉션
//      TO: items/feed-items.js



import { useRouter } from 'next/router';

const LoginHandlerPage = () => {
  const router = useRouter();
  const { email, password } = router.query;

  // Handle login logic using email and password values

  return <p>LoginHandler page</p>;
};

export default LoginHandlerPage;