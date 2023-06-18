import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EditCampaignPage = () => {
  const skyBlue = '#00D6FF';
  const purple = '#9521E5';

  const [campaignName, setCampaignName] = useState('');
  const [campaignCategory, setCampaignCategory] = useState('');
  const [description, setDescription] = useState('');
  const [campaignImage, setCampaignImage] = useState(null);

  const router = useRouter();
  const { userid, campaignid } = router.query;

  // Dummy data for pre-filled input fields
  const dummyData = {
    campaignName: 'Sample Campaign Name',
    campaignCategory: 'Sample Campaign Category',
    description: 'This is a sample description.',
    campaignImage: null, // Provide a sample image if needed
  };

  const handleEditCampaign = async (e) => {
    e.preventDefault();
    const editedCampaign = {
      userid,
      campaignid,
      campaignName,
      campaignCategory,
      description,
      campaignImage
    };
    try {
      const response = await fetch('/api/editCampaignHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCampaign),
      });
      if (response.ok) {
        alert('Campaign edited');
        router.push(`/user-profile?userid=${userid}`);
      } else {
        alert('Campaign cannot be edited.\ntry again');
      }
      // Process the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getdata = async () => {
    try {
      const response = await fetch('/api/getbycampaignid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid, campaignid}),
      });
      if (response.ok) {
        const data = await response.json()
        setCampaignName(data.name)
        setCampaignCategory(data.category)
        setDescription(data.description)
        setCampaignImage(data.image)
      } else {
        alert('Item cannot be edited.\ntry again');
      }
      // Process the response data
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getdata();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCampaignImage(file);
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    router.push('/'); // Redirect to the logout page
  };

  const handleUserProfile = () => {
    // TODO: Redirect to the user profile page
    router.push(`/user-profile?userid=${userid}`); // Pass the userid as a query parameter
  };

  return (
    <div>
      <div style={{ background: `radial-gradient(circle at top right, ${purple}, ${skyBlue})`, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5vh', marginBottom: '2rem' }}>
        <button type="button" onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
        <h1 style={{ color: 'white', fontSize: '2.5rem', textAlign: 'center', margin: 0 }}>Generous KAISTians</h1>
        <button type="button" onClick={handleUserProfile} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>User Profile</button>
      </div>

      <h2 style={{ textAlign: 'center' }}>Edit Campaign</h2>

      <form onSubmit={handleEditCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <input type="text" value={campaignName || dummyData.campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="Campaign Name" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} required />
        <input type="text" value={campaignCategory || dummyData.campaignCategory} onChange={(e) => setItemCategory(e.target.value)} placeholder="Campaign Category" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} required />
        <textarea value={description || dummyData.description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ height: '10rem', width: '300px', resize: 'vertical', padding: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} required />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="campaignImage" style={{ marginBottom: '0.5rem' }}>Campaign Image</label>
          <input type="file" accept="image/*" id="campaignImage" onChange={handleImageChange} style={{ width: '300px', border: '1px solid #ccc', borderRadius: '5px', padding: '1rem' }} required />
        </div>
        <button type="submit" style={{ padding: '1rem', borderRadius: '5px', backgroundColor: skyBlue, color: 'white', border: 'none', cursor: 'pointer', width: '300px' }}>Edit Campaign</button>
      </form>
    </div>
  );
};

export default EditCampaignPage;
