import emailjs from 'emailjs-com';
import { useState } from 'react';

const SendEmailPage = () => {
  const skyBlue = '#00D6FF';
  const purple = '#9521E5';
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    const isKAISTEmail = email.endsWith('@kaist.ac.kr');
    if (!isKAISTEmail) {
      alert('Invalid email address. Please use a KAIST email address.');
      return;
    }

    // TODO: link 변경하기

    emailjs.send('service_d5ieqvx', 'template_hv8i79s', { to_email: email, link: 'http://localhost:3000/start/signup' }, 'TWXJKah82a9ImhfU0')
      .then((response) => {
        console.log('Email sent:', response.status, response.text);
        alert('Verification email has been sent. Please check it in your email account.');
        setEmail('');
      })
      .catch((error) => {
        console.error('Email error:', error);
      });
  };

  return (
    <div style={{ background: `radial-gradient(circle at top right, ${purple}, ${skyBlue})`, height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem' }}>
      <h1 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '3rem' }}>Submit your KAIST email address in order to send a verification email.</h1>
      <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '20rem' }}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '1rem', borderRadius: '30px', fontSize: '1rem', border: '1px solid white' }} required />
        <button type="submit" style={{ backgroundColor: 'transparent', padding: '1rem', borderRadius: '30px', textAlign: 'center', color: 'white', textDecoration: 'none', fontSize: '1rem', border: '1px solid white', width: '100%', cursor: 'pointer' }}>Send Email</button>
      </form>
    </div>
  );
};

export default SendEmailPage;
