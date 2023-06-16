import { useState } from 'react';
import { useRouter } from 'next/router';

const AddItemsPage = () => {
  const skyBlue = '#00D6FF';
  const purple = '#9521E5';

  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);
  
  const router = useRouter();
  const { userid } = router.query;
  
  const handleAddItem = async (e) => {
    e.preventDefault();
    const newItem = {
      itemName,
      itemCategory,
      itemQuantity,
      description,
      itemImage,
      userid,
    };
    try {
      const response = await fetch('/api/addItemHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      if (response.ok) {
        alert('Item added');
        router.push(`./feed-items?userid=${userid}`);
      } else {
        alert('Item cannot be added.\ntry again');
      }
      // Process the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setItemImage(file);
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

      <h2 style={{ textAlign: 'center' }}>Add Item</h2>

      <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} required />
        <input type="text" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} placeholder="Item Category" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} required />
        <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} placeholder="Item Quantity" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ height: '10rem', width: '300px', resize: 'vertical', padding: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} required />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="itemImage" style={{ marginBottom: '0.5rem' }}>Item Image</label>
          <input type="file" accept="image/*" id="itemImage" onChange={handleImageChange} style={{ width: '300px', border: '1px solid #ccc', borderRadius: '5px', padding: '1rem' }} required />
        </div>
        <button type="submit" style={{ padding: '1rem', borderRadius: '5px', backgroundColor: skyBlue, color: 'white', border: 'none', cursor: 'pointer', width: '300px' }}>Add Item</button>
      </form>
    </div>
  );
};

export default AddItemsPage;
