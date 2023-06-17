import { useState } from 'react';
import { useRouter } from 'next/router';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [contact, setContact] = useState('');
  const router = useRouter();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new FormData object to send the data
    // const formData = new FormData();
    // formData.append('username', username);
    // formData.append('email', email);
    // formData.append('password', password);
    // formData.append('profileImage', profileImage);
    // formData.append('contact', contact);

    // // Send user data to add-account page
    // router.push({
    //   pathname: '/api/signupHandler',
    //   query: Object.fromEntries(formData),
    // });
    try {
      const response = await fetch('/api/signupHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password, profileImage, contact})
      });
      if (response.ok) {
        alert('signed up successfully');
        router.push(`../`);
      } else {
        alert('signup failed');
      }
      // Process the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '6rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Generous KAISTians</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '150%' }} required />
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '150%' }} required />
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '150%' }} required />
        <input type="text" value={contact} onChange={handleContactChange} placeholder="Contact" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '150%' }} required />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="profileImage" style={{ marginBottom: '0.5rem' }}>Profile Image</label>
          <input type="file" accept="image/*" id="profileImage" onChange={handleProfileImageChange} style={{ width: '150%', border: '1px solid #ccc', borderRadius: '5px', padding: '1rem' }} required />
        </div>
        <button type="submit" style={{ padding: '1rem', borderRadius: '5px', backgroundColor: '#00D6FF', color: 'white', border: 'none', cursor: 'pointer', width: '150%' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
