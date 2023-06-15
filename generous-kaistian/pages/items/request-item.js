import { useState } from 'react';
import { useRouter } from 'next/router';

const RequestItemPage = () => {
  const skyBlue = '#00D6FF';
  const purple = '#9521E5';

  const post = {
    title: 'Bread',
    tag: 'Food',
    numOfItems: 10,
    description: 'It is yummy and delicious. It is for free!',
    image: 'post-image.jpg',
  };

  const [requestAmount, setRequestAmount] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const router = useRouter();
  const { userid, itemid } = router.query;

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    // Redirect to requestItemHandler.js with requestAmount and requestDescription as query params
    router.push({
      pathname: '/requestItemHandler',
      query: {
        userid,
        itemid,
        requestAmount,
        requestDescription,
      },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Navigation Bar */}
      <div
        style={{
          background: `radial-gradient(circle at top right, ${purple}, ${skyBlue})`,
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '6vh',
        }}
      >
        <button
          type="button"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
        <h1 style={{ color: 'white', fontSize: '2.5rem', textAlign: 'center' }}>Generous KAISTians</h1>
        <button
          type="button"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          User Profile
        </button>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flex: 1, marginTop: '2rem' }}>
        <div
          style={{
            flex: '0 0 60%',
            maxHeight: '90vh',
            overflowY: 'auto',
            paddingRight: '1rem',
            marginBottom: '1rem',
          }}
        >
          <div style={{ background: 'white', boxShadow: '0 2px 7px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '2rem', height: '100%' }}>
            <h2 style={{ marginBottom: '1rem' }}>{post.title}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <img
                src={post.image}
                alt="Post"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }}
              />
            </div>
            <div>
              <p>Category: {post.tag}</p>
              <p>Number of Items: {post.numOfItems}</p>
              <p>Description: {post.description}</p>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: '0 0 40%',
            maxHeight: '90vh',
            overflowY: 'auto',
            paddingLeft: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <h2 style={{ marginBottom: '1rem' }}>Request Item</h2>
          <form onSubmit={handleRequestSubmit}>
            <input
              type="number"
              id="requestAmount"
              value={requestAmount}
              onChange={(e) => setRequestAmount(e.target.value)}
              min={1}
              max={post.numOfItems}
              placeholder="Request Amount"
              style={{
                padding: '0.8rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '100%',
              }}
            />
            <textarea
              id="requestDescription"
              value={requestDescription}
              onChange={(e) => setRequestDescription(e.target.value)}
              placeholder="Request Description"
              style={{
                height: '10rem',
                width: '100%',
                resize: 'vertical',
                padding: '0.8rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.8rem',
                borderRadius: '5px',
                backgroundColor: skyBlue,
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
              disabled={requestAmount <= 0 || requestAmount > post.numOfItems}
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
