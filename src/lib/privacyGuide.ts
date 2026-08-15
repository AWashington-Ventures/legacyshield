import PDFDocument from 'pdfkit';
import { Resend } from 'resend';

function getResend() { return new Resend(process.env.RESEND_API_KEY!); }

const NAVY = '#1A3A5C';
const GOLD = '#C9A217';

interface PrivacyGuideData {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  currentAddress: string;
  previousAddresses: string[];
}

const BROKERS = [
  {
    priority: 'HIGH',
    name: 'Spokeo',
    url: 'https://www.spokeo.com/optout',
    steps: [
      'Go to the URL below',
      'Enter your name and Washington DC (or MD)',
      'Find your record and click "This is me"',
      'Click "Remove this listing" and verify via email',
    ],
    verify: 'Email verification required',
    time: '5 min',
  },
  {
    priority: 'HIGH',
    name: 'WhitePages',
    url: 'https://www.whitepages.com/suppression-requests',
    steps: [
      'Go to the URL below',
      'Click "Remove my listing"',
      'Enter your name and phone number',
      'Complete phone verification',
    ],
    verify: 'Phone verification required',
    time: '3 min',
  },
  {
    priority: 'HIGH',
    name: 'BeenVerified',
    url: 'https://www.beenverified.com/app/optout/search',
    steps: [
      'Go to URL below',
      'Search your name and state',
      'Find your record and click "Opt Out"',
      'Verify via email',
    ],
    verify: 'Email verification required',
    time: '3 min',
  },
  {
    priority: 'HIGH',
    name: 'TruthFinder',
    url: 'https://www.truthfinder.com/opt-out/',
    steps: [
      'Go to URL below',
      'Enter your name and state',
      'Find your record and click "Remove"',
      'Enter email for verification',
    ],
    verify: 'Email verification required',
    time: '3 min',
  },
  {
    priority: 'HIGH',
    name: 'Instant Checkmate',
    url: 'https://www.instantcheckmate.com/opt-out/',
    steps: [
      'Go to URL below',
      'Search your name and state',
      'Select your record and click "Opt Out"',
      'Verify via email',
    ],
    verify: 'Email verification required',
    time: '3 min',
  },
  {
    priority: 'HIGH',
    name: 'Intelius',
    url: 'https://www.intelius.com/opt-out',
    steps: [
      'Go to URL below',
      'Enter your name and state',
      'Find and select your record',
      'Submit — no email verification needed',
    ],
    verify: 'No verification needed',
    time: '2 min',
  },
  {
    priority: 'HIGH',
    name: 'Acxiom (Marketing Database)',
    url: 'https://optout.acxiom.com',
    steps: [
      'Go to URL below — this is the largest marketing database',
      'Enter your name, address, and date of birth',
      'Submit opt-out to remove yourself from thousands of marketing lists',
    ],
    verify: 'Email verification required',
    time: '5 min',
  },
  {
    priority: 'HIGH',
    name: 'LexisNexis',
    url: 'https://optout.lexisnexis.com/',
    steps: [
      'Go to URL below',
      'Click "Opt Out" and enter your personal information',
      'This suppresses your data from background check and legal databases',
    ],
    verify: 'Email verification required',
    time: '5 min',
  },
  {
    priority: 'MEDIUM',
    name: 'Radaris',
    url: 'https://radaris.com/control/privacy',
    steps: [
      'Go to URL below',
      'Search your name and city',
      'Click the options menu on your profile',
      'Select "Remove information" and confirm',
    ],
    verify: 'Email or account required',
    time: '4 min',
  },
  {
    priority: 'MEDIUM',
    name: 'PeopleFinders',
    url: 'https://www.peoplefinders.com/opt-out',
    steps: [
      'Go to URL below',
      'Enter your name and state',
      'Click "This is me" on your record',
      'Submit opt-out and verify via email',
    ],
    verify: 'Email verification required',
    time: '3 min',
  },
  {
    priority: 'MEDIUM',
    name: 'FastPeopleSearch',
    url: 'https://www.fastpeoplesearch.com/removal',
    steps: [
      'Go to URL below',
      'Search your name and city/ZIP',
      'Find your record and click "Remove This Record"',
      'Complete the CAPTCHA — no email needed',
    ],
    verify: 'CAPTCHA only — no email needed',
    time: '2 min',
  },
  {
    priority: 'MEDIUM',
    name: 'USPhoneBook',
    url: 'https://www.usphonebook.com/opt-out',
    steps: [
      'Go to URL below',
      'Enter your phone number OR name + state',
      'Select your record and submit removal',
    ],
    verify: 'No verification needed',
    time: '2 min',
  },
  {
    priority: 'MEDIUM',
    name: 'ZabaSearch',
    url: 'https://www.zabasearch.com/block_privacy.php',
    steps: [
      'Go to URL below',
      'Enter your name and state',
      'Complete the form to block your listing',
    ],
    verify: 'Email verification required',
    time: '2 min',
  },
  {
    priority: 'MEDIUM',
    name: 'MyLife',
    url: 'https://www.mylife.com/privacy-policy/privacy-request-form.html',
    steps: [
      'Go to URL below',
      'Select "Delete my profile"',
      'Enter your name, address, and date of birth',
      'Submit CCPA/privacy removal request',
    ],
    verify: 'Email verification required',
    time: '3 min',
  },
  {
    priority: 'MEDIUM',
    name: 'ThatsThem',
    url: 'https://thatsthem.com/optout',
    steps: [
      'Go to URL below',
      'Enter your name and email address',
      'Submit the opt-out form and verify via email',
    ],
    verify: 'Email verification required',
    time: '2 min',
  },
  {
    priority: 'MEDIUM',
    name: 'Pipl',
    url: 'https://pipl.com/personal-information-removal-request/',
    steps: [
      'Go to URL below',
      'Enter your name and email',
      'Submit the removal request',
    ],
    verify: 'Email verification required',
    time: '2 min',
  },
  {
    priority: 'MEDIUM',
    name: 'PeopleSmart',
    url: 'https://www.peoplesmart.com/optout-go',
    steps: [
      'Go to URL below',
      'Search for your name',
      'Select your record and submit removal request',
    ],
    verify: 'Email verification required',
    time: '2 min',
  },
  {
    priority: 'MEDIUM',
    name: 'Addresses.com',
    url: 'https://www.addresses.com/optout.php',
    steps: [
      'Go to URL below',
      'Enter your name and address',
      'Submit the removal form — no verification needed',
    ],
    verify: 'No verification needed',
    time: '1 min',
  },
];

export async function generatePrivacyGuide(data: PrivacyGuideData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'LETTER', margin: 72 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const fullName = `${data.firstName} ${data.lastName}`;
    const pageW = 612 - 144; // usable width

    // ── Header ──────────────────────────────────────────────────────
    doc
      .fontSize(20)
      .fillColor(NAVY)
      .font('Helvetica-Bold')
      .text('PRIVACY SHIELD GUIDE', { align: 'center' });

    doc
      .fontSize(11)
      .fillColor(GOLD)
      .font('Helvetica')
      .text(`Personalized for ${fullName}`, { align: 'center' });

    doc
      .fontSize(9)
      .fillColor(NAVY)
      .text(`Prepared by LegacyShield Pro  •  legacyshieldpro.com  •  August 2026`, { align: 'center' });

    doc.moveDown(0.4);
    doc.moveTo(72, doc.y).lineTo(540, doc.y).lineWidth(2).strokeColor(GOLD).stroke();
    doc.moveDown(0.6);

    // ── Intro ─────────────────────────────────────────────────────────
    doc
      .fontSize(10)
      .fillColor('#111111')
      .font('Helvetica')
      .text(
        `This guide is personalized for ${fullName}. Use it to remove your personal information from the major data broker ` +
        'databases that sell your name, home address, phone number, and background history to anyone who pays. ' +
        'Work through HIGH PRIORITY sites first — they receive the most traffic. ' +
        'Use your email address for all verification steps. Re-submit every 6 months as brokers continuously re-add data.',
        { align: 'justify' }
      );

    doc.moveDown(0.5);

    // Info box
    const boxY = doc.y;
    doc.roundedRect(72, boxY, pageW, 52, 6).fillColor('#F0F4F8').fill();
    doc.roundedRect(72, boxY, pageW, 52, 6).lineWidth(1).strokeColor(NAVY).stroke();
    doc
      .fontSize(9)
      .fillColor(NAVY)
      .font('Helvetica-Bold')
      .text(`Full Name: `, 82, boxY + 10, { continued: true })
      .font('Helvetica')
      .fillColor('#111111')
      .text(fullName, { continued: false });
    doc
      .fontSize(9)
      .fillColor(NAVY)
      .font('Helvetica-Bold')
      .text(`Current Address: `, 82, boxY + 24, { continued: true })
      .font('Helvetica')
      .fillColor('#111111')
      .text(data.currentAddress);
    doc
      .fontSize(9)
      .fillColor(NAVY)
      .font('Helvetica-Bold')
      .text(`Prior Addresses: `, 82, boxY + 38, { continued: true })
      .font('Helvetica')
      .fillColor('#111111')
      .text(data.previousAddresses.length > 0 ? data.previousAddresses.join('  •  ') : 'None provided');

    doc.moveDown(3);

    // ── Broker Sections ───────────────────────────────────────────────
    const highBrokers = BROKERS.filter(b => b.priority === 'HIGH');
    const medBrokers  = BROKERS.filter(b => b.priority === 'MEDIUM');

    for (const [sectionLabel, brokerList] of [
      ['🔴  HIGH PRIORITY — Submit These First', highBrokers],
      ['🟡  MEDIUM PRIORITY — Submit After High Priority', medBrokers],
    ] as [string, typeof BROKERS][]) {
      doc
        .fontSize(11)
        .fillColor(NAVY)
        .font('Helvetica-Bold')
        .text(sectionLabel);
      doc.moveTo(72, doc.y + 2).lineTo(540, doc.y + 2).lineWidth(1).strokeColor(NAVY).stroke();
      doc.moveDown(0.6);

      for (const broker of brokerList) {
        // Check for page break
        if (doc.y > 680) doc.addPage();

        doc
          .fontSize(10)
          .fillColor(broker.priority === 'HIGH' ? '#C62828' : '#E65100')
          .font('Helvetica-Bold')
          .text(broker.name, { continued: true })
          .fillColor('#555555')
          .font('Helvetica')
          .fontSize(8.5)
          .text(`   ⏱ ${broker.time}  |  ${broker.verify}`, { align: 'right' });

        doc
          .fontSize(8.5)
          .fillColor('#1565C0')
          .font('Helvetica')
          .text(broker.url);

        doc.moveDown(0.2);

        for (const step of broker.steps) {
          doc
            .fontSize(9)
            .fillColor('#333333')
            .font('Helvetica')
            .text(`${step}`, { indent: 12 });
        }

        doc.moveDown(0.2);
        doc
          .fontSize(9)
          .fillColor('#555555')
          .text('□  Submitted     □  Email Verified     □  Confirmed Removed', { indent: 4 });

        doc.moveDown(0.6);
      }
    }

    // ── Footer note ───────────────────────────────────────────────────
    doc.moveDown(0.5);
    doc
      .fontSize(8.5)
      .fillColor('#888888')
      .font('Helvetica-Oblique')
      .text(
        'Set a reminder to resubmit these opt-outs every 6 months — data brokers continuously re-aggregate public records. ' +
        'LegacyShield Pro  •  legacyshieldpro.com  •  Washington DC',
        { align: 'center' }
      );

    doc.end();
  });
}

export async function sendPrivacyGuideEmail(
  email: string,
  firstName: string,
  pdfBuffer: Buffer
): Promise<void> {
  const resend = getResend();

  await resend.emails.send({
    from: 'LegacyShield <hello@legacyshieldpro.com>',
    to: email,
    subject: `Your Privacy Shield Guide is ready, ${firstName}! 🔒`,
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
        <tr><td style="background:#0a1628;padding:28px 40px;border-radius:16px 16px 0 0;text-align:center">
          <span style="color:white;font-size:20px;font-weight:700">🔒 LegacyShield Privacy Shield</span>
        </td></tr>
        <tr><td style="background:white;padding:40px;border-radius:0 0 16px 16px">
          <h1 style="color:#0a1628;font-size:22px;margin:0 0 12px">Your Privacy Shield Guide is attached, ${firstName}!</h1>
          <p style="color:#6b7280;font-size:15px;margin:0 0 20px">Your personalized opt-out guide is attached as a PDF. It covers <strong>18 data broker sites</strong> with step-by-step instructions for removing your personal information from the internet.</p>

          <div style="background:#fff7e6;border-left:4px solid #d4a017;padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 24px">
            <p style="margin:0;font-size:14px;font-weight:700;color:#0a1628">👉 Start with the HIGH PRIORITY sites first</p>
            <p style="margin:6px 0 0;font-size:13px;color:#6b7280">Spokeo, WhitePages, BeenVerified, TruthFinder, Acxiom, and LexisNexis are the most critical. Set aside about 45 minutes.</p>
          </div>

          <p style="color:#374151;font-size:14px;margin:0 0 8px"><strong>Pro tips:</strong></p>
          <ul style="color:#6b7280;font-size:14px;padding-left:20px;margin:0 0 24px">
            <li style="margin-bottom:6px">Keep your email inbox open — several sites require a verification click</li>
            <li style="margin-bottom:6px">Use the checkboxes in the guide to track your progress</li>
            <li style="margin-bottom:6px">Resubmit every 6 months — brokers re-add your data continuously</li>
          </ul>

          <p style="color:#9ca3af;font-size:13px;margin:0">Questions? Reply to this email anytime.</p>
          <p style="color:#374151;font-size:14px;margin:12px 0 0"><strong>&mdash; Anthony Washington</strong><br><span style="color:#9ca3af;font-size:13px">Founder, LegacyShield &mdash; Retired DC Law Enforcement</span></p>
        </td></tr>
        <tr><td style="padding:24px;text-align:center">
          <p style="color:#9ca3af;font-size:12px;margin:0">LegacyShield &middot; Washington DC Metro Area</p>
          <p style="color:#9ca3af;font-size:12px;margin:4px 0 0">
            <a href="https://legacyshieldpro.com" style="color:#d4a017;text-decoration:none">legacyshieldpro.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    attachments: [
      {
        filename: 'Privacy_Shield_Guide.pdf',
        content: pdfBuffer,
      },
    ],
  });
}
