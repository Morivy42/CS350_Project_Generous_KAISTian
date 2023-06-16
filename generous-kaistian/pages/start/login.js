import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send email and password to loginHandler page
    try {
      const response = await fetch('/api/loginHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });
      if (response.ok) {
        alert('login completed');
        const data = await response.json();
        const {userid} = data
        router.push(`../items/feed-items?userid=${userid}`);
      } else {
        alert('login failed');
      }
      // Process the response data
    } catch (error) {
      console.error('Error:', error);
    }
    // router.push(`/api/loginHandler?email=${email}&password=${password}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '6rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Generous KAISTians</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '150%' }} />
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '150%' }} />
        <button type="submit" style={{ padding: '1rem', borderRadius: '5px', backgroundColor: '#00D6FF', color: 'white', border: 'none', cursor: 'pointer', width: '150%' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
