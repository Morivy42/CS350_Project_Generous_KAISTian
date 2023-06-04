// pages/init.js
import { useEffect, useState } from 'react';

export default function InitPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/init')
  });
  
  return null;
}
