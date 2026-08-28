export default function Home() {
  return (
    <main className="min-h-screen bg-[#080f1e]">

      {/* Nav */}
      <nav className="bg-[#0a1628] border-b border-[#1a3a5c] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/lsp_icon_v2.png" alt="LegacyShield Pro" className="h-10 w-auto" />
            <span className="text-white font-bold text-xl tracking-tight">LegacyShield Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#founder" className="text-gray-300 hover:text-white text-sm transition-colors">About</a>
            <a href="#features" className="text-gray-300 hover:text-white text-sm transition-colors">What You Get</a>
            <a href="#pricing" className="text-gray-300 hover:text-white text-sm transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-300 hover:text-white text-sm transition-colors">FAQ</a>
            <a href="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded-full">Sign In</a>
            <a href="/signup" className="bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-semibold text-sm px-5 py-2 rounded-full transition-colors">Join Now</a>
          </div>
          {/* Mobile nav buttons */}
          <div className="flex md:hidden items-center gap-3">
            <a href="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded-full">Sign In</a>
            <a href="/signup" className="bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-semibold text-sm px-4 py-2 rounded-full transition-colors">Join</a>
          </div>
        </div>
      </nav>

      {/* Brand Banner */}
      <section style={{ background: '#0a1628', padding: '24px 20px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{
            borderRadius: 14,
            overflow: 'hidden',
            border: '1px solid rgba(201,168,76,0.25)',
            boxShadow: '0 0 60px rgba(201,168,76,0.07), 0 0 120px rgba(201,168,76,0.03)',
          }}>
            <img
              src="/banner.jpg"
              alt="LegacyShield Pro — Protect. Plan. Legacy."
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-[#0a1628] text-white py-16 md:py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
                Built for DMV Area Families
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Protect Your Family.<br />
                <span className="text-[#d4a017]">Build Your Legacy.</span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                LegacyShield teaches DMV Area families everything they need to know about life insurance,
                estate planning, and building generational wealth — in plain language, from someone in your community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="/signup?plan=community" className="bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold text-base px-8 py-4 rounded-full transition-colors">
                  Get Started — $1 First Month
                </a>
                <a href="#features" className="border border-white/30 hover:border-white text-white font-semibold text-base px-8 py-4 rounded-full transition-colors">
                  See What's Inside
                </a>
              </div>
              <p className="text-gray-400 text-sm mt-6">No jargon. No pushy salespeople. Just real knowledge for real families.</p>
            </div>
            {/* Hero Image */}
            <div className="flex-1 w-full lg:max-w-[520px] relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="/images/hero.jpg"
                  alt="Two women having a meaningful financial planning conversation"
                  className="w-full h-[380px] md:h-[460px] object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/40 to-transparent px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#d4a017] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#0a1628] font-bold text-sm">✓</span>
                    </div>
                    <p className="text-white text-sm font-medium leading-snug">
                      Real guidance from someone<br />who knows your community
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#d4a017]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#d4a017]/5 rounded-full blur-xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Video */}
      <section className="py-16 px-6 bg-[#0a1628] border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            From the Founder
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            A Personal Welcome from <span className="text-[#d4a017]">Anthony Washington</span>
          </h2>
          <p className="text-white/60 mb-8 text-base max-w-xl mx-auto">
            Retired DC law enforcement. 30 years of service. Now on a mission to protect every family&apos;s legacy &mdash; starting with yours.
          </p>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-2xl mx-auto">
            <video
              controls
              preload="auto"
              className="w-full rounded-2xl"
              poster="/legacyshield-welcome-thumb.jpg"
            >
              <source src="/legacyshield-welcome.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="py-20 px-6 bg-[#0a1628] border-b border-[#1a3a5c]/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Avatar + Identity */}
            <div className="flex flex-col items-center lg:items-start gap-5 flex-shrink-0">
              <div className="relative">
                <img
                  src="/images/anthony.jpg"
                  alt="Anthony Washington — Founder of LegacyShield"
                  className="w-40 h-40 rounded-full object-cover object-top shadow-xl ring-4 ring-[#d4a017]/40"
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#d4a017] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-[#0a1628] text-lg">🛡️</span>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white">Anthony Washington</h3>
                <p className="text-[#d4a017] font-semibold text-sm mt-1">Founder & Community Advocate</p>
                {/* Social icons */}
                <div className="flex items-center gap-3 mt-3 justify-center lg:justify-start">
                  <a href="https://www.linkedin.com/in/anthonywashington" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#0a66c2] hover:bg-[#004182] rounded-full flex items-center justify-center transition-colors" aria-label="LinkedIn">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/anthonywashington" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#1877f2] hover:bg-[#0d65d8] rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
              {/* Credential badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start max-w-xs">
                {[
                  { icon: '⭐', label: '30-Year Law Enforcement Veteran' },
                  { icon: '🤝', label: 'Mason & Community Leader' },
                  { icon: '🏠', label: 'DMV Native' },
                  { icon: '👨‍👩‍👧‍👦', label: 'Family Man & Father' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/20 text-[#c9a84c] text-xs font-medium px-3 py-1.5 rounded-full">
                    <span>{badge.icon}</span>
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Bio */}
            <div className="flex-1">
              <div className="inline-block bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                Meet the Founder
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                A Face You Can Trust.<br />
                <span className="text-[#d4a017]">A Voice From Your Community.</span>
              </h2>
              <div className="space-y-4 text-gray-300 text-base leading-relaxed">
                <p>
                  I spent 30 years serving the DC metro area in law enforcement. During that time, I sat across from families in their most vulnerable moments and saw firsthand how financial unpreparedness turns hardship into crisis. Whether it is a family home lost to unpaid property taxes or inheritance stalled in probate court, I have seen how quickly a lack of planning can impact a family’s future. It is a common misconception in our communities that a power of attorney alone is enough to protect your assets.
                </p>
                <p>
                  When I retired in 2020, I realized there were few resources available to provide working families in the DMV with plain, trustworthy guidance on these issues. I created LegacyShield Pro to fill that gap.
                </p>
                <p>
                  As a Master Mason, a father, and a long-time public servant, I built this for our community. LegacyShield Pro offers real knowledge and practical solutions from someone who understands the challenges our neighbors face.
                </p>
                <p className="text-[#c9a84c] font-semibold">
                  Your family deserves a lasting legacy. I invite you to take the first step toward building a protected future with LegacyShield Pro.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#join" className="bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold text-sm px-7 py-3 rounded-full transition-colors text-center">
                  Join the Community
                </a>
                <a href="#features" className="border border-[#c9a84c]/40 hover:border-[#c9a84c] text-[#c9a84c] font-semibold text-sm px-7 py-3 rounded-full transition-colors text-center">
                  See What's Inside
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="about" className="py-20 px-6 bg-[#050f2b]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Problem No One Talks About</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Families in the DC metro area are leaving generational wealth on the table — not because they don't care, but because no one explained the rules.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '56%',
                label: 'of District of Columbia residents have life insurance',
                sub: 'Approximately 56% of District of Columbia residents have life insurance, which remains below the national average. This coverage gap exposes local families to severe financial risks, including the inability to cover final expenses, replace lost income, or maintain housing following an unexpected loss.',
                refs: [
                  'Policygenius — Life insurance statistics & data (2024)',
                  'Consumer Affairs / Journal of Consumer Research — Life insurance statistics 2026',
                  'Financial Health Network — Life Insurance in America: Understanding and Closing Coverage Gaps',
                  'DC Fiscal Policy Institute — DC Has Disparities in Health Coverage Despite Its Low Uninsured Rate',
                ]
              },
              {
                stat: '69.4%',
                label: 'of Black homeowners age 50+ have no will or trust',
                sub: '69.4% of Black homeowners age 50+ do not have a will or trust, compared with 34.9% of older white homeowners — a gap that puts generational wealth at serious risk.',
                refs: [
                  'Urban Institute — Prospective Heirs\' Property among Older Homeowners (Oct 2024)',
                  'Caring.com — Wills & Estate Planning Study (2021 and annual reports)',
                  'AARP Research — Disparities in Wealth Transfer: Experiences and Expectations of Adults Ages 50+ (June 2024)',
                ]
              },
              {
                stat: '1/7th',
                label: 'the wealth of white families held by Black households',
                sub: 'The typical Black household holds approximately $44,100 in net worth, compared to $284,310 for the typical white household. Black families possess only about 15 cents (or roughly 1/7th) of every dollar held by white families.',
                refs: [
                  'National Community Reinvestment Coalition (NCRC) — The Racial Wealth Gap 1992 to 2022 (October 2024)',
                ]
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#0a1f3d] border border-[#c9a84c]/20 rounded-2xl p-8 text-center">
                <div className="text-4xl font-bold text-[#d4a017] mb-2">{item.stat}</div>
                <div className="font-semibold text-white mb-3">{item.label}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.sub}</p>
                {'refs' in item && (item as any).refs && (
                  <ul className="mt-3 text-left space-y-1">
                    {(item as any).refs.map((ref: string, ri: number) => (
                      <li key={ri} className="text-gray-400 text-xs leading-snug">• {ref}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-[#0a1628] border-b border-[#1a3a5c]/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              Member Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real Families. Real Results.</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Here&apos;s what LegacyShield members are saying.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'I always thought estate planning was for rich people. After the courses, I found out I had a $400,000 gap in coverage and no will. We fixed both in one month. I feel like I can finally breathe.',
                name: 'Marcus T.',
                location: 'PG County, MD',
                plan: 'Community Member',
              },
              {
                quote: "Anthony speaks our language. No jargon, no pressure. I got my first life insurance policy at 47 — something I'd been putting off for years. Wish I'd done this sooner.",
                name: 'Denise W.',
                location: 'Southeast DC',
                plan: 'Community Member',
              },
              {
                quote: 'The attorney Q&A session alone was worth the upgrade. I got answers in 30 minutes that would have cost me $300 at a law firm. My will is finally done.',
                name: 'Raymond H.',
                location: 'Alexandria, VA',
                plan: 'Legacy Builder',
              },
            ].map((t, i) => (
              <div key={i} className="bg-[#0a1f3d] border border-[#c9a84c]/15 rounded-2xl p-7 flex flex-col gap-5">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-[#d4a017] text-base">★</span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{t.location} &middot; {t.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-[#0a1628]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What's Inside LegacyShield</h2>
            <p className="text-gray-300 text-lg">Everything your family needs — in one place, at a price that makes sense.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: '🛡️',
                title: 'Life Insurance 101',
                desc: 'Learn the difference between term and whole life, how much coverage you actually need, and how to stop overpaying. No agent. No pressure.'
              },
              {
                icon: '📋',
                title: 'Estate Planning Basics',
                desc: 'Wills, trusts, beneficiaries, power of attorney — explained simply. Protect what you\'ve built so your family keeps it.'
              },
              {
                icon: '💰',
                title: 'Generational Wealth Playbook',
                desc: 'How to start building wealth that outlasts you. Real strategies for DC working families — not Wall Street theory.'
              },
              {
                icon: '🤝',
                title: 'Community Workshops',
                desc: 'Monthly in-person workshops in the DC metro area. Ask questions, meet your neighbors, and learn together in a trusted space.'
              },
              {
                icon: '⚖️',
                title: 'Attorney Q&A Credits',
                desc: 'Premium members get quarterly credits to consult a licensed estate attorney. Real legal guidance at a fraction of the cost.'
              },
              {
                icon: '📱',
                title: 'On-Demand Video Library',
                desc: 'Watch at your pace. Short, clear video lessons on every topic — life insurance, wills, budgeting, and more. No jargon.'
              },
            ].map((f, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-[#d4a017]/30 hover:shadow-md transition-all">
                <div className="text-3xl flex-shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-[#050f2b]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Common Questions</h2>
            <p className="text-gray-300 text-lg">No jargon. Straight answers.</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'Is LegacyShield a real course or just generic content?',
                a: 'Everything inside LegacyShield was built specifically for DC metro area families — the stats, the resources, the legal references. It is not recycled content from a national template. Anthony Washington built it from 30 years of lived experience in this community.',
              },
              {
                q: 'Do I need any financial background to use LegacyShield?',
                a: 'None at all. The courses are written in plain English for people who have never opened a life insurance policy or talked to an estate attorney. If you can read this page, you can learn everything inside.',
              },
              {
                q: 'Is this financial or legal advice?',
                a: 'LegacyShield is a financial education platform — not a law firm or a financial advisory. We teach you how these systems work so you can make informed decisions and ask better questions when you do work with professionals. Legacy Builder members get access to licensed attorney Q&A sessions.',
              },
              {
                q: 'What happens after the $1 first month?',
                a: 'After your first month, you are billed at your plan rate ($39/month for Community, $99/month for Legacy Builder). You can cancel at any time before renewal with no penalty. There are no contracts and no hidden fees.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Cancel from your account dashboard at any time. If you cancel before your next billing date, you keep access through the end of your current period and will not be charged again.',
              },
              {
                q: 'Is my payment information secure?',
                a: 'All payments are processed through Stripe — the same payment processor used by Amazon, Shopify, and thousands of major companies. LegacyShield never stores your card details.',
              },
            ].map((item, i) => (
              <details key={i} className="group bg-[#0a1628] border border-[#1a3a5c]/50 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between px-7 py-5 cursor-pointer list-none">
                  <span className="font-semibold text-white text-base pr-4">{item.q}</span>
                  <span className="text-[#d4a017] font-bold text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-7 pb-5">
                  <p className="text-gray-300 text-sm leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Honest Pricing</h2>
            <p className="text-gray-300 text-lg">No hidden upsells. Just education that pays for itself.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#0f2040] border border-[#1a3a5c] rounded-2xl p-8">
              <div className="text-gray-300 text-sm font-semibold uppercase tracking-wider mb-4">Community Member</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-bold text-[#d4a017]">$1</span>
                <span className="text-gray-400 text-sm">first month</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">Then $39/month · Cancel anytime</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Full video course library',
                  'Monthly community workshops',
                  'Life insurance calculator & guides',
                  'Estate planning templates',
                  'Private community access',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="text-[#d4a017] font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="/signup?plan=community" className="block text-center bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold py-3 rounded-full transition-colors">
                Join Community
              </a>
            </div>
            <div className="bg-[#d4a017] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#0a1628] text-[#d4a017] text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</div>
              <div className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Legacy Builder</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-bold text-white">$1</span>
                <span className="text-[#0a1628]/60 text-sm">first month</span>
              </div>
              <p className="text-[#0a1628]/60 text-sm mb-8">Then $99/month · Cancel anytime</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Community',
                  'Quarterly attorney consult credits',
                  '1:1 legacy planning session/year',
                  'Insurance policy review',
                  'Priority workshop seating',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white text-sm">
                    <span className="font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="/signup?plan=legacy_builder" className="block text-center bg-[#0a1628] hover:bg-[#0f2040] text-[#d4a017] font-bold py-3 rounded-full transition-colors">
                Build My Legacy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section id="join" className="py-20 px-6 bg-[#0a1628]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Limited Time Offer
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your First Month Is $1.</h2>
          <p className="text-gray-300 text-lg mb-3">
            Full access. No commitment. Cancel before your second month and you won&apos;t be charged again.
          </p>
          <p className="text-slate-400 text-base mb-10">
            Join the families in the DC metro area already protecting what they&apos;ve built.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a href="/signup?plan=community" className="bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold text-base px-10 py-4 rounded-full transition-colors">
              Start for $1 — Community Plan
            </a>
            <a href="/signup?plan=legacy_builder" className="border-2 border-[#0a1628] hover:bg-[#0a1628] hover:text-white text-[#0a1628] font-bold text-base px-10 py-4 rounded-full transition-colors">
              Start for $1 — Legacy Builder
            </a>
          </div>
          <p className="text-gray-400 text-sm">Secure checkout via Stripe &middot; Cancel anytime &middot; No contracts</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1628] text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/lsp_icon_v2.png" alt="LegacyShield" className="h-8 w-auto" />
            <span className="text-white font-bold">LegacyShield</span>
          </div>
          <p className="text-sm text-center">LegacyShield is a financial education platform. We do not provide legal or financial advice.</p>
          <div className="text-right">
            <p className="text-sm">© 2026 LegacyShield Pro. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-1">Certified Business Enterprise (CBE) | DC Department of Small and Local Business Development (DSLBD)</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
