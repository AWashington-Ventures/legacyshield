export const metadata = { title: 'Privacy Policy — LegacyShield Pro', description: 'Privacy Policy for LegacyShield Pro' };

export default function PrivacyPolicy() {
  return (
    <div style={{minHeight:'100vh',background:'#f9fafb',fontFamily:'sans-serif'}}>
      <div style={{background:'#0a1628',padding:'1rem 2rem',display:'flex',alignItems:'center',gap:'1rem'}}>
        <a href="/"><img src="/images/legacyshield_icon.png" alt="LegacyShield" style={{height:'40px'}} /></a>
        <span style={{color:'white',fontWeight:'bold',fontSize:'1.1rem'}}>LegacyShield Pro</span>
      </div>
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'3rem 2rem',color:'#1f2937'}}>
        <h1 style={{fontSize:'2rem',fontWeight:'bold',color:'#0a1628',marginBottom:'0.5rem'}}>Privacy Policy</h1>
        <p style={{color:'#6b7280',marginBottom:'2rem'}}>Last updated: June 1, 2026</p>

        <p style={{marginBottom:'1.5rem'}}>LegacyShield Pro ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services at legacyshieldpro.com.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>1. Information We Collect</h2>
        <p style={{marginBottom:'1rem'}}>We collect information you provide directly to us, including:</p>
        <ul style={{paddingLeft:'1.5rem',marginBottom:'1.5rem',lineHeight:'1.8'}}>
          <li>Name, email address, and password when you create an account</li>
          <li>Payment information processed securely through Stripe (we never store card details)</li>
          <li>Course progress and activity within the platform</li>
          <li>Communications you send to us</li>
        </ul>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>2. How We Use Your Information</h2>
        <ul style={{paddingLeft:'1.5rem',marginBottom:'1.5rem',lineHeight:'1.8'}}>
          <li>To provide, maintain, and improve our services</li>
          <li>To process payments and manage your subscription</li>
          <li>To send you service-related communications and updates</li>
          <li>To respond to your questions and support requests</li>
          <li>To analyze usage patterns and improve the platform</li>
        </ul>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>3. Information Sharing</h2>
        <p style={{marginBottom:'1.5rem'}}>We do not sell, trade, or rent your personal information to third parties. We may share your information only with trusted service providers who assist in operating our platform (Stripe for payments, MongoDB for data storage, Resend for email communications), and only as necessary to provide our services.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>4. Data Security</h2>
        <p style={{marginBottom:'1.5rem'}}>We implement industry-standard security measures to protect your personal information. All payment data is handled by Stripe, which is PCI DSS compliant. Passwords are encrypted and never stored in plain text.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>5. Cookies</h2>
        <p style={{marginBottom:'1.5rem'}}>We use cookies and similar tracking technologies to maintain your session and analyze site usage. You can control cookie settings through your browser preferences.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>6. Your Rights</h2>
        <p style={{marginBottom:'1rem'}}>You have the right to:</p>
        <ul style={{paddingLeft:'1.5rem',marginBottom:'1.5rem',lineHeight:'1.8'}}>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your account and data</li>
          <li>Cancel your subscription at any time from your account dashboard</li>
        </ul>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>7. Contact Us</h2>
        <p style={{marginBottom:'1.5rem'}}>If you have questions about this Privacy Policy or your personal data, contact us at: <a href="mailto:ahwashington@legacyshieldpro.com" style={{color:'#d4a017'}}>ahwashington@legacyshieldpro.com</a></p>

        <div style={{marginTop:'3rem',paddingTop:'2rem',borderTop:'1px solid #e5e7eb',textAlign:'center'}}>
          <a href="/" style={{color:'#d4a017',textDecoration:'none',fontWeight:'bold'}}>← Back to LegacyShield Pro</a>
        </div>
      </div>
    </div>
  );
}
