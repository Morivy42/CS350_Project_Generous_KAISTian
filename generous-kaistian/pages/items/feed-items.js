import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FeedItemsPage = () => {
  const [posts, setposts] = useState([]);

  const skyBlue = '#00D6FF';
  const purple = '#9521E5';
  const router = useRouter();

  const { userid } = router.query; // userid 값을 query 형식으로 받아옴
  // console.log('userid:'+userid)
  const handleLogout = () => {
    router.push('/');
  };

  const handleUserProfile = () => {
    router.push(`/user-profile?userid=${userid}`); // userid를 query 형식으로 전송
  };

  const handleAddPost = () => {
    router.push(`/items/add-item?userid=${userid}`); // userid를 query 형식으로 전송
  };
  
  const handleCampaigns = () => {
    router.push(`/campaigns/feed-campaigns?userid=${userid}`); // userid를 query 형식으로 전송
  };

  const handlePostClick = (itemid) => {
    router.push(`/items/request-item?userid=${userid}&itemid=${itemid}`); // userid와 itemid를 query 형식으로 전송
  };

  const getPosts = async () => {
    try {
      const response = await fetch(`../api/getitems`)
      const data = await response.json()
      // console.log(data)
      setposts(data)
      // return data
    } catch (error) {
      console.error('Error retrieving items:', error)
    }
  }

  // Dummy data for posts
  // const posts = [
  //   {
  //     itemid: 1,
  //     title: 'Post 1',
  //     tag: 'Tag 1',
  //     description: 'Description 1',
  //     numOfApplicants: 5,
  //     image: 'image1.jpg',
  //   },
  //   {
  //     itemid: 2,
  //     title: 'Post 2',
  //     tag: 'Tag 2',
  //     description: 'Description 2',
  //     numOfApplicants: 3,
  //     image: 'image2.jpg',
  //   },
  //   // Add more posts...
  // ];

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {/* 상단바 */}
      <div style={{ background: `radial-gradient(circle at top right, ${purple}, ${skyBlue})`, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5vh' }}>
        <button type="button" onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
        <h1 style={{ color: 'white', fontSize: '2.5rem', textAlign: 'center' }}>Generous KAISTians</h1>
        <button type="button" onClick={handleUserProfile} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>User Profile</button>
      </div>

      {/* 포스트 출력 */}
      <div style={{ padding: '1rem', background: 'white' }}>
        {posts.map((post, index) => (
          <div key={index} style={{ boxShadow: '0 2px 7px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '1rem', marginBottom: '1rem', background: 'white', cursor: 'pointer' }} onClick={() => handlePostClick(post.itemid)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={post.photo} alt="Post" style={{ width: '10rem', height: '10rem', objectFit: 'cover', borderRadius: '5px', marginRight: '1rem' }} />
              <div>
                <h2 style={{ marginBottom: '0.5rem' }}>{post.name}</h2>
                <p style={{ color: '#888', marginBottom: '0.5rem' }}>{post.category}</p>
                <p style={{ marginBottom: '0.5rem' }}>{post.description}</p>
                <p style={{ color: '#888', marginBottom: '0.5rem' }}>{`${post.requested_users ? post.requested_users.length : 0} people applied`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* + 버튼 */}
      <button
        type="button"
        onClick={handleAddPost}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: skyBlue,
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '3rem',
          height: '3rem',
          fontSize: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        +
      </button>

{/* Campaigns 버튼 */}
      <button
        type="button"
        onClick={handleCampaigns}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          background: skyBlue,
          color: 'white',
          border: 'none',
          borderRadius: '1.5rem', // 수정된 부분: 모서리 둥글기 적용
          width: '7rem',
          height: '3rem',
          fontSize: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        Campaigns
      </button>
    </div>
  );
};

export default FeedItemsPage;
