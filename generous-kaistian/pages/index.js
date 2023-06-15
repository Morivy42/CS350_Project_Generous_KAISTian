import Link from 'next/link';

const IndexPage = () => {
  const skyBlue = '#00D6FF';
  const purple = '#9521E5';

  return (
    <div style={{ background: `radial-gradient(circle at bottom left, ${skyBlue}, ${purple})`, height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '6rem' }}>
      <h1 style={{ color: 'white', fontSize: '4rem', marginBottom: '8rem', marginTop: '4rem', borderRadius: '10px', padding: '1rem' }}>Generous KAISTians</h1>
      <div style={{ display: 'flex', gap: '4rem', width: '20rem' }}>
        <Link href="/start/login">
          <a style={{ flex: 1, backgroundColor: 'transparent', padding: '1rem', borderRadius: '30px', textAlign: 'center', color: 'white', textDecoration: 'none', fontSize: '1rem', border: '1px solid white' }}>Login</a>
        </Link>
        <Link href="/start/send-email">
          <a style={{ flex: 1, backgroundColor: 'transparent', padding: '1rem', borderRadius: '30px', textAlign: 'center', color: 'white', textDecoration: 'none', fontSize: '1rem', border: '1px solid white' }}>Signup</a>
        </Link>
      </div>
      <Link href="/start/contact">
        <a style={{ marginTop: '6rem', color: 'white', fontSize: '1rem', textDecoration: 'none' }}>Contact</a>
      </Link>
    </div>
  );
};

export default IndexPage;
