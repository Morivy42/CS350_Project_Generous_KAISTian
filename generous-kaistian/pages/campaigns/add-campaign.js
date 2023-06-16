import { useState } from 'react';
import { useRouter } from 'next/router';

const AddCampaignsPage = () => {
  const skyBlue = '#00D6FF';
  const purple = '#9521E5';

  const [campaignName, setCampaignName] = useState('');
  const [campaignCategory, setCampaignCategory] = useState('');
  const [description, setDescription] = useState('');
  const [campaignImage, setCampaignImage] = useState(null);

  const router = useRouter();
  const { userid } = router.query;

  const handleAddCampaign = async (e) => {
    e.preventDefault();

    const newCampaign = {
      userid,
      campaignName,
      campaignCategory,
      description,
      campaignImage,
    }

    try {
      const response = await fetch('/api/addCampaignHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCampaign)
      });

      if (response.ok) {
        // 정보가 성공적으로 전송된 경우에 대한 처리
        console.log('Campaign added successfully!');
        alert('Campaign added successfully!')
        // 여기서 다음 페이지로 이동하거나 작업을 수행할 수 있습니다.
        router.push(`./feed-campaigns?userid=${userid}`);
      } else {
        // 정보 전송에 실패한 경우에 대한 처리
        console.log('Failed to add campaign.');
        alert('Failed to add campaign.')
      }
    } catch (error) {
      // 네트워크 오류 등 예외 처리
      console.log('An error occurred:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCampaignImage(file);
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
    <div>
      <div style={{ background: `radial-gradient(circle at top right, ${purple}, ${skyBlue})`, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5vh', marginBottom: '2rem' }}>
        <button type="button" onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
        <h1 style={{ color: 'white', fontSize: '2.5rem', textAlign: 'center', margin: 0 }}>Generous KAISTians</h1>
        <button type="button" onClick={handleUserProfile} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>User Profile</button>
      </div>

      <h2 style={{ textAlign: 'center' }}>Add Campaign</h2>

      <form onSubmit={handleAddCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="Campaign Name" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} required />
        <input type="text" value={campaignCategory} onChange={(e) => setCampaignCategory(e.target.value)} placeholder="Campaign Category" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ height: '10rem', width: '300px', resize: 'vertical', padding: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} required />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="campaignImage" style={{ marginBottom: '0.5rem' }}>Campaign Image</label>
          <input type="file" accept="image/*" id="campaignImage" onChange={handleImageChange} style={{ width: '300px', border: '1px solid #ccc', borderRadius: '5px', padding: '1rem' }} required />
        </div>
        <button type="submit" style={{ padding: '1rem', borderRadius: '5px', backgroundColor: skyBlue, color: 'white', border: 'none', cursor: 'pointer', width: '300px' }}>Add Campaign</button>
      </form>
    </div>
  );
};

export default AddCampaignsPage;
