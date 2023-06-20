import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EditItemPage = () => {
  const skyBlue = '#00D6FF';
  const purple = '#9521E5';

  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);

  const [requests, setrequests] = useState([]);

  const router = useRouter();
  const { userid, itemid } = router.query;

  // 성준 추가
  const {choosed_user_id, setchoo_user_id} = useState(1);

  // Dummy data for pre-filled input fields
  const dummyData = {
    itemName: 'Sample Item Name',
    itemCategory: 'Sample Item Category',
    itemQuantity: '5',
    description: 'This is a sample description.',
    itemImage: null, // Provide a sample image if needed
  };

  //// 6/19 성준 추가
  const handleRequestConfirm = async (ch_user_id) => {
    //e.preventDefault();
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
      const response = await fetch('/api/requestConfirmHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ch_user_id, itemid
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

  const handleEditItem = async (e) => {
    e.preventDefault();
    const editedItem = {
      userid,
      itemid,
      itemName,
      itemCategory,
      itemQuantity,
      description,
      itemImage,
    };
    try {
      const response = await fetch('/api/editItemHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedItem),
      });
      if (response.ok) {
        alert('Item edited');
        router.push(`/user-profile?userid=${userid}`);
      } else {
        alert('Item cannot be edited.\ntry again');
      }
      // Process the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getdata = async () => {
    try {
      const response = await fetch('/api/getbyitemid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid, itemid}),
      });
      if (response.ok) {
        const data = await response.json()
        setItemName(data.name)
        setItemCategory(data.category)
        setItemQuantity(data.quantity)
        setDescription(data.description)
        setItemImage(data.photo)
      } else {
        alert('Item cannot be edited.\ntry again');
      }
      // Process the response data
    } catch (error) {
      console.error('Error:', error);
    }
  }

  /////////// 성준 11:49 추가
  const getRequests = async () => {
    try {
      const response = await fetch(`../api/getrequests`)
      const data = await response.json()
      // console.log(data)
      setrequests(data)
      // return data
    } catch (error) {
      console.error('Error retrieving items:', error)
    }
  }
  const searchRequests = async () => {
    try {
      let url = '/api/search_requests?';
      url += `title=${encodeURIComponent(itemid)}`;
      const response = await fetch(url);
      const data = await response.json();
      setrequests(data);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };
  const get_setchoo = async () => {
    try {
      // console.log(data)
      setchoo_user_id(1)
      // return data
    } catch (error) {
      console.error('Error retrieving items:', error)
    }
  };

  /////////////
  useEffect(() => {
    getdata();
    getRequests();
    get_setchoo();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setItemImage(file);
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

      <h2 style={{ textAlign: 'center' }}>Edit Item</h2>

      <form onSubmit={handleEditItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <input type="text" value={itemName || dummyData.itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} required />
        <input type="text" value={itemCategory || dummyData.itemCategory} onChange={(e) => setItemCategory(e.target.value)} placeholder="Item Category" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} required />
        <input type="number" value={itemQuantity || dummyData.itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} placeholder="Item Quantity" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} required />
        <textarea value={description || dummyData.description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ height: '10rem', width: '300px', resize: 'vertical', padding: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} required />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="itemImage" style={{ marginBottom: '0.5rem' }}>Item Image</label>
          <input type="file" accept="image/*" id="itemImage" onChange={handleImageChange} style={{ width: '300px', border: '1px solid #ccc', borderRadius: '5px', padding: '1rem' }} required />
        </div>
        <button type="submit" style={{ padding: '1rem', borderRadius: '5px', backgroundColor: skyBlue, color: 'white', border: 'none', cursor: 'pointer', width: '300px' }}>Edit Item</button>
      </form>

      <h2 style={{ textAlign: 'center' }}>Requests</h2>

      <div style={{ padding: '1rem', background: 'white' }}>
        {requests.map((request, index) => (
          <div key={index} style={{ boxShadow: '0 2px 7px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '1rem', marginBottom: '1rem', background: 'white', cursor: 'pointer' }} onClick={() => handleRequestConfirm(request.userid)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <h2 style={{ marginBottom: '0.5rem' }}>{request.quantity}</h2>
                <p style={{ marginBottom: '0.5rem' }}>{request.appeal}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditItemPage;
