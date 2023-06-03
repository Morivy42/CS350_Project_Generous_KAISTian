import { useEffect, useState } from 'react';
import Link from 'next/link';

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 여기서 데이터 테이블에 접속해 데이터를 가져옴.
      const response = await fetch('/api/mytable');
      //가져온 데이터를 파싱해서 data에 저장
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    /* 일단은 {item.name}만 프린트 되도록 함. 또한 item.name, item.quantity 값을 쿼리로
     전달하는 링크 만들어둠. 이 링크 클릭하면 post.js 페이지로 이동*/
    <div>
      <p>hi Next.js</p>
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}> 
              <Link href={`/post?title=${item.name}&quantity=${item.quantity}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Index;