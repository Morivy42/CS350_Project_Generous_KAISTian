import { useRouter } from 'next/router';

const userProfilePage = () => {
  const skyBlue = '#00D6FF';
  const purple = '#9521E5';
  const router = useRouter();

  const { userid } = router.query;

  const handleLogout = () => {
    router.push('/');
  };

  const handleReturnFeed = () => {
    router.push(`/items/feed-items?userid=${userid}`);
  };

  // Dummy data for user information, items, and campaigns
  const user = {
    profileImage: 'profile.jpg',
    donatedItems: [
        { item: 'Item 1', numberOfRequests: 2 },
        { item: 'Item 2', numberOfRequests: 0 },
        { item: 'Item 3', numberOfRequests: 5 },
        // ...other donated items
    ],
    requestedItems: [
      { item: 'Item 11', status: 1 },
      { item: 'Item 12', status: 1 },
      { item: 'Item 13', status: 1 },
      { item: 'Item 14', status: 0 },
      { item: 'Item 15', status: 0 },
      { item: 'Item 16', status: 0 },
      { item: 'Item 17', status: -1 },
      { item: 'Item 18', status: -1 },
    ],
    initiatedCampaigns: [
        { campaign: 'Campaign 1', numberOfRequests: 0 },
        { campaign: 'Campaign 2', numberOfRequests: 3 },
        { campaign: 'Campaign 3', numberOfRequests: 0 },
        // ...other initiated campaigns
    ],
    requestedCampaigns: [
        { campaign: 'Campaign 4', status: 1 },
        { campaign: 'Campaign 5', status: 0 },
        { campaign: 'Campaign 6', status: -1 },
    ],
  };

  return (
    <div>
      {/* 상단바 */}
      <div style={{ background: `radial-gradient(circle at top right, ${purple}, ${skyBlue})`, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5vh' }}>
        <button type="button" onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
        <h1 style={{ color: 'white', fontSize: '2.5rem', textAlign: 'center' }}>Generous KAISTians</h1>
        <button type="button" onClick={handleReturnFeed} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>Return to Feed</button>
      </div>

      {/* 박스 3개 */}
      <div style={{ display: 'flex', padding: '1rem', background: 'white', height: '80vh' }}>
        {/* 유저 정보 */}
        <div style={{ marginRight: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={user.profileImage} alt="Profile" style={{ width: '5rem', height: '5rem', objectFit: 'cover', borderRadius: '50%', marginBottom: '1rem' }} />
          <p>Donated Items: {user.donatedItems.length}</p>
          <p>Requested Items: {user.requestedItems.length}</p>
          <p>Initiated Campaigns: {user.initiatedCampaigns.length}</p>
          <p>Requested Campaigns: {user.requestedCampaigns.length}</p>
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginRight: '1rem' }}>
          <div style={{ marginBottom: '0rem' }}>
            <h2 style={{ marginBottom: '0rem' }}>Items</h2>
          </div>
          <h3 style={{ marginBottom: '1rem' }}>Donated</h3>
            <div style={{ overflowY: 'scroll', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', padding: '1rem' }}>
            <div>
                <div style={{ height: '50vh', overflowY: 'scroll' }}>
                {user.donatedItems.map((item, index) => (
                    <div key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer', flex: 1 }} onClick={() => router.push(`/items/edit-item?userid=${userid}&item=${item.item}`)}>
                        {item.item}
                    </div>
                    <button type="button" style={{ cursor: 'pointer', width: '5rem', backgroundColor: item.numberOfRequests === 0 ? '#CCCCCC' : '#00D6FF', color: '#FFFFFF', border: 'none', borderRadius: '0.3rem', padding: '0.5rem 1rem' }} onClick={() => console.log(`Edit ${item.item}`)}>
                        {item.numberOfRequests === 0 ? 'No Requests' : `${item.numberOfRequests} Requests`}
                    </button>
                    </div>
                ))}
                </div>
            </div>
            </div>
          <h3 style={{ marginBottom: '1rem' }}>Requested</h3>
          <div style={{ overflowY: 'scroll', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', padding: '1rem' }}>
            <div>
                <div style={{ height: '50vh', overflowY: 'scroll' }}>
                {user.requestedItems.map((item, index) => (
                    <div key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer', flex: 1 }} onClick={() => router.push(`/items/edit-item?userid=${userid}&item=${item.item}`)}>
                        {item.item}
                    </div>
                    <button type="button" style={{ cursor: 'pointer', width: '5rem', backgroundColor: item.status === -1 ? '#FF4F4F' : item.status === 0 ? '#FFCD3C' : '#4CAF50', color: 'white', border: 'none', borderRadius: '0.3rem', padding: '0.5rem 1rem' }} onClick={() => console.log(`Edit ${item.item}`)}>
                        {item.status === -1 ? 'Rejected' : item.status === 0 ? 'Waiting' : 'Approved'}
                    </button>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>

        {/* Campaigns */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ marginBottom: '0rem' }}>
            <h2 style={{ marginBottom: '0rem' }}>Campaigns</h2>
          </div>
          <h3 style={{ marginBottom: '1rem' }}>Initiated</h3>
            <div style={{ overflowY: 'scroll', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', padding: '1rem' }}>
            <div>
                <div style={{ height: '50vh', overflowY: 'scroll' }}>
                {user.initiatedCampaigns.map((campaign, index) => (
                    <div key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer', flex: 1 }} onClick={() => router.push(`/campaigns/edit-campaign?userid=${userid}&campaign=${campaign.campaign}`)}>
                        {campaign.campaign}
                    </div>
                    <button type="button" style={{ cursor: 'pointer', width: '5rem', backgroundColor: campaign.numberOfRequests === 0 ? '#CCCCCC' : '#00D6FF', color: '#FFFFFF', border: 'none', borderRadius: '0.3rem', padding: '0.5rem 1rem' }} onClick={() => console.log(`Edit ${campaign.campaign}`)}>
                        {campaign.numberOfRequests === 0 ? 'No Requests' : `${campaign.numberOfRequests} Requests`}
                    </button>
                    </div>
                ))}
                </div>
            </div>
            </div>
          <h3 style={{ marginBottom: '1rem' }}>Requested</h3>
          <div style={{ overflowY: 'scroll', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', padding: '1rem' }}>
            <div>
                <div style={{ height: '50vh', overflowY: 'scroll' }}>
                {user.requestedCampaigns.map((campaign, index) => (
                    <div key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer', flex: 1 }} onClick={() => router.push(`/campaigns/edit-campaign?userid=${userid}&campaign=${campaign.campaign}`)}>
                        {campaign.campaign}
                    </div>
                    <button type="button" style={{ cursor: 'pointer', width: '5rem', backgroundColor: campaign.status === -1 ? '#FF4F4F' : campaign.status === 0 ? '#FFCD3C' : '#4CAF50', color: 'white', border: 'none', borderRadius: '0.3rem', padding: '0.5rem 1rem' }} onClick={() => console.log(`Edit ${campaign.campaign}`)}>
                        {campaign.status === -1 ? 'Rejected' : campaign.status === 0 ? 'Waiting' : 'Approved'}
                    </button>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default userProfilePage;
