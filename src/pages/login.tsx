import Link from 'next/link';
import { useForm, FieldErrors } from 'react-hook-form';

interface HookFormTypes {
  mail: string;
  pw: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<HookFormTypes>();
  const onValid = (data: HookFormTypes) => {
    const {mail, pw} = data
    fetch('/api/verifyingUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          // Handle a successful response
          sessionStorage.setItem('mail', mail);
          window.location.href = '/';
        } else {
          // Handle an error response
          alert('login failed');
          console.error('Error:', response);
        }
      })
      .catch(error => {
        // Handle any network or fetch error
        console.error('Error:', error);
      });
  };
  // const onInValid = (errors: FieldErrors) => console.log(errors);

  return (
    <body style={{ backgroundColor: 'skyblue' }}>
      <h1 className="title">Generous KAISTian</h1>
      <div style={{ height: '20px' }}></div>
      <h1 className="title-sub">Log in</h1>
      <div style={{ height: '30px' }}></div>
      <form
        onSubmit={handleSubmit(onValid)} // Submit 클릭 시에 onValid 함수 실행
        // action={'api/login'}
        // method="POST"
        className="out"
      >
        <label htmlFor="mail" style={{ marginRight: '10px' }}>
          KAIST mail :
        </label>
        <input
          {...register('mail', { required: true })}
          type="email"
          placeholder="generous@kaist.ac.kr"
          style={{ marginRight: '10px' }}
        />
        <br></br>
        <label htmlFor="pw" style={{ marginRight: '10px' }}>
          Password :
        </label>
        <input
          {...register('pw', { required: true })}
          type="password"
          placeholder="password"
        />
        <br></br>
        <button type="submit" className="button" style={{ marginTop: '20px' }}>
          Submit
        </button>
      </form>
      <div style={{ height: '50px' }}></div>
      <div className="out">
        <Link className="button" href={'/signup'}>
          Sign up
        </Link>
      </div>
    </body>
  );
};

export default Login;
