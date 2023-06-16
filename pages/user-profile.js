import { useRouter } from 'next/router';

const UserProfilePage = () => {
  const userItems = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    // ...더미 데이터 추가
  ];

  const userCampaigns = [
    { id: 1, title: 'Campaign 1' },
    { id: 2, title: 'Campaign 2' },
    // ...더미 데이터 추가
  ];

  const userRequestedItems = [
    { id: 1, title: 'Requested Item 1' },
    { id: 2, title: 'Requested Item 2' },
    // ...더미 데이터 추가
  ];

  const userRequestedCampaigns = [
    { id: 1, title: 'Requested Campaign 1' },
    { id: 2, title: 'Requested Campaign 2' },
    // ...더미 데이터 추가
  ];

  const router = useRouter();
  const { userid } = router.query;

  const handleEditItem = (itemid) => {
    router.push(`/edit-item?userid=${userid}&itemid=${itemid}`);
  };

  const handleEditCampaign = (campaignid) => {
    router.push(`/edit-campaign?userid=${userid}&campaignid=${campaignid}`);
  };

  return (
    <div>
      {/* DATA1: User Information */}
      {/* ...이하 코드는 이전과 동일... */}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* DATA2: User Items */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', maxHeight: '200px' }}>
          {userItems.map((item) => (
            <div key={item.id} style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
              <h3>{item.title}</h3>
              <button type="button" onClick={() => handleEditItem(item.id)}>Edit</button>
            </div>
          ))}
        </div>

        {/* DATA3: User Campaigns */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', maxHeight: '200px' }}>
          {userCampaigns.map((campaign) => (
            <div key={campaign.id} style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
              <h3>{campaign.title}</h3>
              <button type="button" onClick={() => handleEditCampaign(campaign.id)}>Edit</button>
            </div>
          ))}
        </div>

        {/* DATA4: User Requested Items */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', maxHeight: '200px' }}>
          {userRequestedItems.map((item) => (
            <div key={item.id} style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
              <h3>{item.title}</h3>
              <button type="button" onClick={() => handleEditItem(item.id)}>Edit</button>
            </div>
          ))}
        </div>

        {/* DATA5: User Requested Campaigns */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', maxHeight: '200px' }}>
          {userRequestedCampaigns.map((campaign) => (
            <div key={campaign.id} style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
              <h3>{campaign.title}</h3>
              <button type="button" onClick={() => handleEditCampaign(campaign.id)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
