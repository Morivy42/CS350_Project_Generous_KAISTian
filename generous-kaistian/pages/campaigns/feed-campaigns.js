import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FeedCampaignsPage = () => {
  const [campaigns, setcampaigns] = useState([]);

  const skyBlue = '#00D6FF';
  const purple = '#9521E5';
  const router = useRouter();

  const { userid } = router.query; // userid 값을 query 형식으로 받아옴

  const handleLogout = () => {
    router.push('/');
  };

  const handleUserProfile = () => {
    router.push(`/user-profile?userid=${userid}`); // userid를 query 형식으로 전송
  };

  const handleAddCampaign = () => {
    router.push(`/campaigns/add-campaign?userid=${userid}`); // userid를 query 형식으로 전송
  };

  const handleCampaignClick = (campaignid) => {
    router.push(`/campaigns/request-campaign?userid=${userid}&campaignid=${campaignid}`); // userid와 campaignid를 query 형식으로 전송
  };

  const handleItems = () => {
    router.push(`/items/feed-items?userid=${userid}`); // userid를 query 형식으로 전송
  };

  // Dummy data for campaigns
  // const campaigns = [
  //   {
  //     campaignid: 1,
  //     title: 'Campaign 1',
  //     category: 'Category 1',
  //     description: 'Description 1',
  //     numOfParticipants: 10,
  //     image: 'image1.jpg',
  //   },
  //   {
  //     campaignid: 2,
  //     title: 'Campaign 2',
  //     category: 'Category 2',
  //     description: 'Description 2',
  //     numOfParticipants: 5,
  //     image: 'image2.jpg',
  //   },
  //   // Add more campaigns...
  // ];

  const getcampaigns = async () => {
    try {
      const response = await fetch(`../api/getcampaigns`)
      const data = await response.json()
      console.log(data)
      setcampaigns(data)
      return data
    } catch (error) {
      console.error('Error retrieving items:', error)
    }
  }

  useEffect(() => {
    getcampaigns();
  }, []);

  return (
    <div>
      {/* 상단바 */}
      <div style={{ background: `radial-gradient(circle at top right, ${purple}, ${skyBlue})`, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5vh' }}>
        <button type="button" onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
        <h1 style={{ color: 'white', fontSize: '2.5rem', textAlign: 'center' }}>Generous KAISTians</h1>
        <button type="button" onClick={handleUserProfile} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>User Profile</button>
      </div>

      {/* 캠페인 출력 */}
      <div style={{ padding: '1rem', background: 'white' }}>
        {campaigns.map((campaign, index) => (
          <div key={index} style={{ boxShadow: '0 2px 7px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '1rem', marginBottom: '1rem', background: 'white', cursor: 'pointer' }} onClick={() => handleCampaignClick(campaign.campaignid)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={campaign.image} alt="Campaign" style={{ width: '10rem', height: '10rem', objectFit: 'cover', borderRadius: '5px', marginRight: '1rem' }} />
              <div>
                <h2 style={{ marginBottom: '0.5rem' }}>{campaign.name}</h2>
                <p style={{ color: '#888', marginBottom: '0.5rem' }}>{campaign.category}</p>
                <p style={{ marginBottom: '0.5rem' }}>{campaign.description}</p>
                <p style={{ color: '#888', marginBottom: '0.5rem' }}>{`${campaign.numpart} participants`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* + 버튼 */}
      <button
        type="button"
        onClick={handleAddCampaign}
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

      {/* Items 버튼 */}
      <button
        type="button"
        onClick={handleItems}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          background: skyBlue,
          color: 'white',
          border: 'none',
          borderRadius: '1.5rem',
          width: '7rem',
          height: '3rem',
          fontSize: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        Items
      </button>
    </div>
  );
};

export default FeedCampaignsPage;
