export default function PrivacyGuideSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-[#d4a017] rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">🔒</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Your Privacy Shield Guide is on its way!
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Check your inbox — your personalized guide has been sent to your email address.
          It covers 18 data broker sites with step-by-step instructions.
        </p>

        <div className="bg-[#0f2040] border border-[#1a3a5c] rounded-2xl p-6 text-left mb-8">
          <p className="text-[#d4a017] font-bold text-sm uppercase tracking-widest mb-3">Quick Start Tips</p>
          <ul className="space-y-2.5">
            {[
              'Start with the HIGH PRIORITY sites first — they get the most traffic',
              'Keep your email inbox open for verification links',
              'Use the checkboxes in the guide to track your progress',
              'Set aside about 45 minutes to complete all HIGH PRIORITY sites',
              'Resubmit every 6 months — data brokers re-add your information continuously',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-[#d4a017] font-bold flex-shrink-0 mt-0.5">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-gray-500 text-sm">
          Questions? Email us at{' '}
          <a href="mailto:hello@legacyshieldpro.com" className="text-[#d4a017] hover:underline">
            hello@legacyshieldpro.com
          </a>
        </p>

        <div className="mt-8">
          <a
            href="/"
            className="inline-block bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold py-3 px-8 rounded-full text-sm transition-colors"
          >
            Learn More About LegacyShield Pro →
          </a>
        </div>
      </div>
    </div>
  );
}
