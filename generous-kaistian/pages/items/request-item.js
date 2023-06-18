import { useState } from 'react';
import { useRouter } from 'next/router';

const RequestItemPage = () => {
  const skyBlue = '#00D6FF';
  const purple = '#9521E5';

  const [requestAmount, setRequestAmount] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const router = useRouter();
  const { userid, itemid, itemtitle, itemtag, itemnum, itemdesc } = router.query;

  const post = {
    title: 'Bread',
    tag: 'Food',
    numOfItems: itemid,
    description: 'It is yummy and delicious. It is for free!',
    image: 'post-image.jpg',
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    // Redirect to requestItemHandler.js with requestAmount and requestDescription as query params
    // router.push({
    //   pathname: 'generous-kaistian\pages\api\requestItemHandler',
    //   query: {
    //     userid,
    //     itemid,
    //     requestAmount,
    //     requestDescription,
    //   },
    // });
    try {
      const response = await fetch('/api/requestItemHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userid, itemid, requestAmount, requestDescription
        })
      });
      if (response.ok) {
        alert('request completed');
        router.push(`./feed-items?userid=${userid}`);
      } else {
        alert('request failed.\ntry again');
      }
      // Process the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    // TODO: 로그아웃 기능 구현
    router.push('/'); // 로그아웃 페이지로 이동
  };

  const handleUserProfile = () => {
    // TODO: 사용자 프로필 페이지로 이동
    router.push(`/user-profile?userid=${userid}`); // userid를 query 형식으로 전송
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: `radial-gradient(circle at top right, ${purple}, ${skyBlue})`, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5vh', marginBottom: '2rem' }}>
        <button type="button" onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
        <h1 style={{ color: 'white', fontSize: '2.5rem', textAlign: 'center', margin: 0 }}>Generous KAISTians</h1>
        <button type="button" onClick={handleUserProfile} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>User Profile</button>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flex: 1, marginTop: '0rem', alignItems: 'flex-start' }}>
        <div
          style={{
            flex: '0 0 60%',
            maxHeight: '90vh',
            overflowY: 'auto',
            paddingRight: '1rem',
            marginBottom: '1rem',
          }}
        >
          <div style={{ background: 'white', boxShadow: '0 2px 7px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '2rem', height: '70vh' }}>
            <h2 style={{ marginBottom: '1rem', marginTop: 0 }}>{itemtitle}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <img
                src={post.image}
                alt="Post"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }}
              />
            </div>
            <div>
              <p>Category: {itemtag}</p>
              <p>Number of Items: {itemnum}</p>
              <p>Description: {itemdesc}</p>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: '0 0 35%',
            maxHeight: '90vh',
            overflowY: 'auto',
            paddingLeft: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <h2 style={{ marginBottom: '1rem', marginTop: '2rem' }}>Request Item</h2>
          <form onSubmit={handleRequestSubmit}>
            <input
              type="number"
              id="requestAmount"
              value={requestAmount}
              onChange={(e) => setRequestAmount(e.target.value)}
              min={1}
              max={itemnum}
              placeholder="Request Amount"
              style={{
                padding: '0.8rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '90%',
                marginBottom: '0.5rem'
              }}
            />
            <textarea
              id="requestDescription"
              value={requestDescription}
              onChange={(e) => setRequestDescription(e.target.value)}
              placeholder="Request Description"
              style={{
                height: '10rem',
                width: '90%',
                resize: 'vertical',
                padding: '0.8rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '90%',
                marginBottom: '0.5rem'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.5rem', // 크기 조정
                borderRadius: '5px',
                backgroundColor: skyBlue,
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                width: '20%',
              }}
              disabled={requestAmount <= 0 || requestAmount > itemnum}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestItemPage;
