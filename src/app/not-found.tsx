import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{minHeight:'100vh',background:'#0a1628',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',color:'white',textAlign:'center',padding:'2rem'}}>
      <img src="/images/legacyshield_icon.png" alt="LegacyShield" style={{height:'64px',marginBottom:'2rem'}} />
      <h1 style={{fontSize:'6rem',fontWeight:'bold',color:'#d4a017',margin:'0'}}>404</h1>
      <h2 style={{fontSize:'1.5rem',marginBottom:'1rem'}}>Page Not Found</h2>
      <p style={{color:'#9ca3af',marginBottom:'2rem',maxWidth:'400px'}}>The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" style={{background:'#d4a017',color:'#0a1628',padding:'0.75rem 2rem',borderRadius:'9999px',fontWeight:'bold',textDecoration:'none'}}>Back to Home</Link>
    </div>
  )
}
