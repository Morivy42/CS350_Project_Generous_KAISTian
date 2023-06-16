const ContactPage = () => {
    const skyBlue = '#00D6FF';
    const purple = '#9521E5';
  
    return (
      <div style={{ background: `radial-gradient(circle at top right, ${purple}, ${skyBlue})`, height: '86vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem' }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '2rem' }}>Team 7 of KAIST CS350</h1>
        <p style={{ color: 'white', textAlign: 'center', fontSize: '1rem' }}>
          Please feel free to contact us if you have further inquiries: <br />
          <a href="mailto:bullbum1126@kaist.ac.kr" style={{ color: 'white', textDecoration: 'underline' }}>bullbum1126@kaist.ac.kr</a>
        </p>
      </div>
    );
  };
  
  export default ContactPage;
  