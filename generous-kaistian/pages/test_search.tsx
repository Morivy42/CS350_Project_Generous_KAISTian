import { useEffect, useState } from 'react';

const IndexPage: React.FC = () => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const getItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error retrieving items:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search_title?title=${searchValue}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error searching for items:', error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      {/* Display the initial items */}
      {items.map((item) => (
        <div key={item.itemid}>{item.name}</div>
      ))}

      {/* Search input and button */}
      <input
        type="text"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display the search results */}
      {searchResults.map((item) => (
        <div key={item.itemid}>{item.name}</div>
      ))}
    </div>
  );
};

export default IndexPage;
