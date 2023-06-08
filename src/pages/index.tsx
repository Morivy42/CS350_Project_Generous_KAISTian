import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <body style={{ backgroundColor: 'skyblue' }}>
        <h4 className="title">Generous KAISTian</h4>
        <div style={{ height: '100px' }}></div>
        <div className="out">
          <Link className="button" href={'/login'}>
            Login
          </Link>
          <Link
            className="button"
            href={'/signup'}
            style={{ marginLeft: '30px' }}
          >
            Sign Up
          </Link>
        </div>
      </body>
    </div>
  );
};

export default Home;
