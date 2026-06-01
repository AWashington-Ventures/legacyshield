export const metadata = { title: 'Terms of Service — LegacyShield Pro', description: 'Terms of Service for LegacyShield Pro' };

export default function TermsOfService() {
  return (
    <div style={{minHeight:'100vh',background:'#f9fafb',fontFamily:'sans-serif'}}>
      <div style={{background:'#0a1628',padding:'1rem 2rem',display:'flex',alignItems:'center',gap:'1rem'}}>
        <a href="/"><img src="/images/legacyshield_icon.png" alt="LegacyShield" style={{height:'40px'}} /></a>
        <span style={{color:'white',fontWeight:'bold',fontSize:'1.1rem'}}>LegacyShield Pro</span>
      </div>
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'3rem 2rem',color:'#1f2937'}}>
        <h1 style={{fontSize:'2rem',fontWeight:'bold',color:'#0a1628',marginBottom:'0.5rem'}}>Terms of Service</h1>
        <p style={{color:'#6b7280',marginBottom:'2rem'}}>Last updated: June 1, 2026</p>

        <p style={{marginBottom:'1.5rem'}}>By accessing and using LegacyShield Pro at legacyshieldpro.com ("Service"), you agree to be bound by these Terms of Service. Please read them carefully before subscribing.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>1. Description of Service</h2>
        <p style={{marginBottom:'1.5rem'}}>LegacyShield Pro is a financial education platform providing on-demand courses, resources, and community access focused on life insurance, estate planning, and generational wealth strategies. We are an educational platform — not a law firm, financial advisor, or insurance broker. Nothing on this platform constitutes legal, financial, or insurance advice.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>2. Subscriptions and Billing</h2>
        <ul style={{paddingLeft:'1.5rem',marginBottom:'1.5rem',lineHeight:'1.8'}}>
          <li>Your first month is billed at $1.00 as a promotional rate.</li>
          <li>After the first month, your subscription renews at $39/month (Community) or $99/month (Legacy Builder).</li>
          <li>You will be charged automatically on your renewal date unless you cancel before it.</li>
          <li>All payments are processed securely through Stripe. We never store your card details.</li>
          <li>Subscription fees are non-refundable except as required by law.</li>
        </ul>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>3. Cancellation</h2>
        <p style={{marginBottom:'1.5rem'}}>You may cancel your subscription at any time from your account dashboard. Upon cancellation, you will retain access through the end of your current billing period and will not be charged again. Cancellation does not entitle you to a refund of any previously charged amounts.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>4. Account Responsibilities</h2>
        <ul style={{paddingLeft:'1.5rem',marginBottom:'1.5rem',lineHeight:'1.8'}}>
          <li>You are responsible for maintaining the security of your account credentials.</li>
          <li>You may not share your account with others or use it for commercial redistribution of our content.</li>
          <li>You must be at least 18 years old to subscribe.</li>
          <li>You agree to provide accurate information when creating your account.</li>
        </ul>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>5. Intellectual Property</h2>
        <p style={{marginBottom:'1.5rem'}}>All content on LegacyShield Pro — including videos, courses, guides, and materials — is owned by LegacyShield Pro and protected by copyright. You may not reproduce, distribute, or create derivative works without our express written permission.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>6. Disclaimer</h2>
        <p style={{marginBottom:'1.5rem'}}>LegacyShield Pro provides educational content only. We make no guarantees regarding the outcomes of any financial, legal, or insurance decisions you make based on our content. Always consult a licensed attorney or financial advisor for advice specific to your situation.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>7. Limitation of Liability</h2>
        <p style={{marginBottom:'1.5rem'}}>To the maximum extent permitted by law, LegacyShield Pro shall not be liable for any indirect, incidental, or consequential damages arising from your use of our service.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>8. Changes to Terms</h2>
        <p style={{marginBottom:'1.5rem'}}>We may update these Terms from time to time. Continued use of the Service after changes constitutes your acceptance of the revised Terms.</p>

        <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:'#0a1628',margin:'2rem 0 0.75rem'}}>9. Contact</h2>
        <p style={{marginBottom:'1.5rem'}}>Questions about these Terms? Contact us at: <a href="mailto:ahwashington@legacyshieldpro.com" style={{color:'#d4a017'}}>ahwashington@legacyshieldpro.com</a></p>

        <div style={{marginTop:'3rem',paddingTop:'2rem',borderTop:'1px solid #e5e7eb',textAlign:'center'}}>
          <a href="/" style={{color:'#d4a017',textDecoration:'none',fontWeight:'bold'}}>← Back to LegacyShield Pro</a>
        </div>
      </div>
    </div>
  );
}
