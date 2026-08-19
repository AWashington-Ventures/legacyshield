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
      'Visit the URL above and enter your full name and City/State (e.g. John Doe, Washington, DC)',
      'Scroll through the results and find your record',
      'Click on your name to open your profile page',
      'Copy the full URL from your browser address bar',
      'Click the browser Back button to return to the Spokeo homepage',
      'Scroll to the bottom of the page to "Opt Out Your Listing from Spokeo"',
      'Paste your copied profile URL into the URL field',
      'Enter your email address and click "Opt Out"',
      'Check your email and click the verification link to confirm removal',
    ],
    verify: 'Email verification required',
    time: '7 min',
  },
  {
    priority: 'HIGH',
    name: 'WhitePages',
    url: 'https://www.whitepages.com/suppression-requests',
    steps: [
      'Visit the URL above and enter your full name and City/State in the provided fields',
      'Scroll through the results and find your record',
      'Click on your name to open your profile page',
      'Copy the full URL from your browser address bar',
      'Return back to https://www.whitepages.com/suppression-requests',
      'Paste your copied profile URL into the URL field and click Next',
      'Enter your current cell phone number — WhitePages will generate a one-time code and place a call',
      'When prompted by the automated assistant, enter the verification code',
      'Opt Out is completed',
    ],
    verify: 'Phone call verification required',
    time: '5 min',
  },
  {
    priority: 'HIGH',
    name: 'BeenVerified',
    url: 'https://www.beenverified.com/app/optout/search',
    steps: [
      'Visit the URL above and enter your first name and last name in the provided fields',
      'Tip: Leave the State field set to "All" for the broadest search, or use the dropdown to narrow by state',
      'Scroll through the results — use the left sidebar filter menu to narrow results, then click "Refine Results"',
      'When you find your record, click "Proceed to Opt Out"',
      'Enter your current email address and complete the hCaptcha verification',
      'Click "Send Verification Email"',
      'Note: The verification email may take a while to arrive — continue with other sites while you wait',
      'Once the email arrives, follow the instructions inside to complete your opt-out',
    ],
    verify: 'Email verification required (may be delayed)',
    time: '5 min',
  },
  {
    priority: 'HIGH',
    name: 'TruthFinder (via PeopleConnect)',
    url: 'https://www.truthfinder.com/opt-out/',
    steps: [
      'Note: This link opens the PeopleConnect opt-out/suppression page (shared with Instant Checkmate)',
      'If you already completed Instant Checkmate first, you may see "An email has been sent to the address you provided" — simply click the link in that email to complete suppression here as well',
      'Visit the URL above, enter your email address, agree to the Terms of Service, and click Continue',
      'Check your email for a "Confirm your email address" message and click it to open',
      'Click "Verify Email" — this returns you to the TruthFinder/PeopleConnect site',
      'Enter your date of birth and click Continue',
      'Enter your legal name and click Continue',
      'Select the record that best describes you and click Continue',
      'PeopleConnect will verify your identity via email — click Continue',
      'You are now on the Control page — click the dropdown arrow in the "Desired Behavior" bar and select "Suppressed", then click Save',
      'After a brief pause, the page will confirm: "This identity\'s Background Report is currently configured as suppressed across our people search websites"',
      'Your identity is now suppressed — you may close the browser and continue other activities',
    ],
    verify: 'Email verification required (two-step)',
    time: '8 min',
  },
  {
    priority: 'HIGH',
    name: 'Instant Checkmate (via PeopleConnect)',
    url: 'https://www.instantcheckmate.com/opt-out/',
    steps: [
      'Note: The Instant Checkmate opt-out link connects to the opt-out/suppression landing page for PeopleConnect',
      'If you already completed TruthFinder first, you may see "An email has been sent to the address you provided" — simply click the link in that email to complete suppression here as well',
      'Visit the URL above and enter your email address in the provided space, agree to terms, and click Continue',
      'Check your email for a "Confirm your email address" message and click on it to open — once open, click "Verify Email" — this will take you back to Instant Checkmate/PeopleConnect',
      'Enter your date of birth, verify, and click Continue',
      'Enter your legal name and click Continue',
      'Select the record that describes you and click Continue',
      'PeopleConnect will verify it is actually you via your email address — click Continue',
      'You should now be on the Control page — click the dropdown arrow in the "Desired Behavior" bar, select "Suppressed", then click Save',
      'After a brief pause, the Control page will return the message: "This identity\'s Background Report is currently configured as suppressed across our people search websites"',
      'Your identity is now suppressed — you may close the browser and continue other activities',
    ],
    verify: 'Email verification required (two-step)',
    time: '8 min',
  },
  {
    priority: 'HIGH',
    name: 'Intelius (via PeopleConnect)',
    url: 'https://www.intelius.com/opt-out',
    steps: [
      'Note: The Intelius opt-out link connects to the opt-out/suppression landing page for PeopleConnect',
      'If you already completed TruthFinder or Instant Checkmate first, you may see "An email has been sent to the address you provided" — simply click the link in that email to complete suppression here as well',
      'Visit the URL above and enter your email address in the provided space, agree to terms, and click Continue',
      'Check your email for a "Confirm your email address" message and click on it to open — once open, click "Verify Email" — this will take you back to Intelius/PeopleConnect',
      'Enter your date of birth, verify, and click Continue',
      'Enter your legal name and click Continue',
      'Select the record that describes you and click Continue',
      'PeopleConnect will verify it is actually you via your email address — click Continue',
      'You should now be on the Control page — click the dropdown arrow in the "Desired Behavior" bar, select "Suppressed", then click Save',
      'After a brief pause, the Control page will return the message: "This identity\'s Background Report is currently configured as suppressed across our people search websites"',
      'Your identity is now suppressed — you may close the browser and continue other activities',
    ],
    verify: 'Email verification required (two-step)',
    time: '8 min',
  },
  {
    priority: 'HIGH',
    name: 'Acxiom (Marketing Database)',
    url: 'https://www.acxiom.com/optout/',
    steps: [
      'Visit the URL above — scroll to the very bottom of the page and look for "Do Not Sell My Personal Information" in small print, then click it',
      'Under "Select Opt Out Segment", select: Mailing Address, Phone Numbers, and Email Address',
      'Under "Who is opting out?", select "Me" and continue filling out all information fields — click the "+" icon at the end of each section to confirm it, then click Submit',
      'Confirm your email address, verify you are not a robot, then click Submit',
      'You should see: "Thank You for Submitting Your Opt Out Request to Acxiom" — an email with a verification link will be sent to your address',
      'Check your email for the "Consumer Opt-Out Verification" email and open it',
      'Click the Opt-Out request link in the email (or copy and paste it into your browser)',
      'You should see: "Acxiom Opt Out Confirmation. Complete the robot challenge, then click the button below to confirm your Opt Out Request."',
      'Verify you are not a robot and click Submit',
      'You will receive a final confirmation message with a reference number confirming you have been successfully opted out from Acxiom\'s marketing data products',
    ],
    verify: 'Two-step email verification required',
    time: '10 min',
  },
  {
    priority: 'HIGH',
    name: 'LexisNexis',
    url: 'https://optout.lexisnexis.com/',
    steps: [
      'Visit the URL above — you will land on the opt-out welcome message. Click Next',
      'You are now on the Instructions page. Read the instructions and click Next',
      'You are now on the Opt-Out Reason page. Click the dropdown arrow and select the category that best describes you. Note: some categories may require additional verifiable information — the easiest choice is "I do not want my information shared". Click Next',
      'You are now on the Person to Opt-Out page. Enter your information, then click "Add Person". The word "Entered:" should appear with your name listed under it. Click Next',
      'You are now on the Address to Opt-Out page. Enter your address, then click "Add Address". The word "Entered:" should appear with your address listed under it. Click Next',
      'You are now on the Communications page — this is for LexisNexis to contact you if they need additional information. Enter your phone number and email address. Leave "Send postal mail communications" set to "Do not send postal mail". Click Confirm',
      'You should now be on the final page showing your confirmation number for the request',
      'You are all done!',
    ],
    verify: 'Confirmation number provided (no email verification)',
    time: '8 min',
  },
  {
    priority: 'MEDIUM',
    name: 'Radaris',
    url: 'https://radaris.com/control-privacy',
    steps: [
      'Visit the URL above — you will land on the "Information Control & Removal Service" welcome message. Click Next',
      'You are now on the "Please identify your personal page" page. Since you may not yet have your profile URL, search for your personal page using your first name, last name, city, and state. Click the search icon',
      'Scroll through the results and find your record. Note: if no record is found, that is a good thing — you are done!',
      'When you find your information, click on your record. This will take you to the next page. Click "Start Removing"',
      'Enter your email address, verify you are not a robot, then click Submit',
      'After clicking Submit, you should be redirected to the "Verification Successful" page. If you click Next from this page, you will be directed to an upsell page — there is no need to purchase anything',
      'Check your email for further instructions and follow them. Note: There will be a delay in receiving email from Radaris — give it some time and work on other brokers while you wait!',
    ],
    verify: 'Email verification required (may be delayed)',
    time: '6 min',
  },
  {
    priority: 'MEDIUM',
    name: 'PeopleFinders',
    url: 'https://www.peoplefinders.com/opt-out',
    steps: [
      'Visit the URL above and click Next under "Right to Opt-Out"',
      'Enter your full name and email address',
      'In the "I am:" box, leave the default: "the subject of the request"',
      'Check the box to authorize PeopleFinders to communicate with you regarding your opt-out',
      'Verify you are not a robot',
      'Click "Send Request"',
      '⚠️ A green bar will appear that reads "Remove my info from over 20 websites" — DO NOT click this button. It is an upsell you do not need',
      'On the same page, scroll to the bottom to the "Record Suppression Form"',
      'Enter the requested information. Note: Your email address is defaulted to opt-out — you will not be able to add a different email address',
      'Check the box to confirm you reviewed the information being submitted',
      'Verify you are not a robot',
      'Click Submit',
      '⚠️ A green bar will again appear that reads "Remove my info from over 20 websites" — DO NOT click this button. It is an upsell you do not need',
      'Once both sections are submitted, a message will appear at the top of the page: "Email Sent: You\'re not done! An email has been sent to [Your Name - YourEmail]. Please check your inbox and follow the instructions in the email to complete the opt out process"',
      'Check your email for a message with the subject line: "Complete your peoplefinders.com Privacy Request"',
      'Open the email and click "Click here to fill out the form"',
      'You will be redirected to the "Record Suppression Form" page',
      'Fill out the requested information — some fields will be auto-populated',
      'Verify your information is correct',
      'Verify you are not a robot',
      'Click Submit',
      'A confirmation message should appear at the top of the screen: "The following information was submitted to our system successfully. We will locate and remove your record based on the information you provided. Expect your information to be fully removed in 3 days or less."',
      'You are all done!',
    ],
    verify: 'Email verification required (2-step: form + email link)',
    time: '10 min',
  },
  {
    priority: 'MEDIUM',
    name: 'FastPeopleSearch',
    url: 'https://www.fastpeoplesearch.com/removal',
    steps: [
      'Visit the URL above and click Next under "Right to Opt-Out"',
      'Enter the requested information',
      'Check the box to authorize FastPeopleSearch to communicate with you regarding your opt-out',
      'Click Submit',
      'After submitting, you should receive a message stating that you are not done and to check your email for opt-out instructions',
      'Check your email for a message with the subject line: "Complete your fastpeoplesearch.com Privacy Request"',
      'Open the email and click "Click here to fill out the form"',
      'You will be redirected to the "Do Not Sell/Right to Opt-Out" page',
      'Fill out the requested information — some fields will be auto-populated',
      'Verify your information is correct',
      'Click Submit',
      'Once submitted, you will be redirected to the "Opt-Out Request Submitted Successfully" page',
      'You are all done!',
    ],
    verify: 'Email verification required (2-step: form + email link)',
    time: '8 min',
  },
  {
    priority: 'MEDIUM',
    name: 'USPhoneBook',
    url: 'https://www.usphonebook.com/opt-out',
    steps: [
      'Visit the URL above',
      'Enter the requested information',
      'Check the circle to authorize USPhoneBook to communicate with you regarding your opt-out',
      'Verify you are not a robot',
      'Click "Begin Removal Process"',
      'After submitting, you should receive a message stating that you are not done and to check your email for opt-out instructions',
      'Check your email for a message with the subject line: "Complete your usphonebook.com Privacy Request"',
      'Open the email and click "Click here to fill out the form"',
      'You will be redirected to the "Opt-Out Request Confirmation" page',
      'Fill out the requested information — some fields will be auto-populated',
      'Verify your information is correct by clicking the circle',
      'Verify you are not a robot',
      'Click "Confirm Removal Process"',
      'Once submitted, you will be redirected to the "Opt-Out Request Confirmation" page',
      'You are all done!',
    ],
    verify: 'Email verification required (2-step: form + email link)',
    time: '8 min',
  },
  {
    priority: 'MEDIUM',
    name: 'ZabaSearch',
    url: 'https://www.zabasearch.com/',
    steps: [
      'Visit the URL above',
      'Scroll to the very bottom of the page — you will see in small print "Do Not Sell or Share My Personal Information". Click on it. This will take you to the Data Privacy Center',
      'Click "View User Data Tools"',
      'Scroll down to "Right to Opt Out"',
      'Click "Open Cookie Preferences"',
      'Check "Do Not Sell or Share My Personal Information" then click "Save My Preferences"',
      'You will see a message that "Your opt out preferences has been honored". This window will close automatically or you can click the "X" at the top right of the dialogue box',
      'Continuing under "Right to Opt Out", enter the requested information',
      'Click Submit',
      'You should now see a message in green that reads "Opt out successful"',
      'Scroll down to "Right to Delete"',
      'If your email address has not been auto-populated, enter it',
      'Click "Delete My User Data"',
      'You will receive a message in green that reads: "Your deletion request has been submitted! You must complete the process by clicking the link sent to your email"',
      'Check your email for the message "Your deletion request for Intelius has been processed"',
      'If ZabaSearch has your information, follow the instructions in the email. If ZabaSearch does not have your information, you have completed this opt-out',
      '⚠️ Note: Under "Right to Delete", a second message will appear after clicking "Delete My User Data" that reads: "Deleting your User Data will NOT prevent other users from searching for your Public Data through our services. To suppress your information from appearing in Background Reports on our website, please create a Suppression Request." If you click the Suppression Request link, it will re-route you to the PeopleConnect Suppression Center. Follow steps 18–28 below to complete suppression',
      'Enter your email address in the PeopleConnect Suppression Center',
      'Agree to terms and click Continue',
      'Check your email for a "Confirm your email address" message and click on it to open',
      'Once the email is open, click "Verify Email" — this will take you back to ZabaSearch/PeopleConnect',
      'If not already auto-populated, enter your date of birth, verify it is correct, and click Continue',
      'If not already auto-populated, enter your legal name, verify it is correct, and click Continue',
      'Select the record that describes you and click Continue',
      'PeopleConnect will verify your identity via your email address. Click Continue',
      'You should now be on the Control page. Click the dropdown arrow in the Desired Behavior bar and select Suppressed, then click Save',
      'After a brief pause, the Control page should return with the message: "This identity\'s Background Report is currently configured as suppressed across our people search websites"',
      'Your identity is now suppressed on this website. You may close the browser and continue other activities',
    ],
    verify: 'Email verification required + optional PeopleConnect suppression',
    time: '15 min',
  },
  {
    priority: 'MEDIUM',
    name: 'MyLife',
    url: 'https://www.mylife.com/pub-multisearch.pubview?pb=1',
    steps: [
      'Visit the URL above and enter your first name, last name, and city or ZIP code in the provided spaces, then click the search icon',
      'Scroll through the results and find your record',
      'When you find your information, click "View Reputation Profile"',
      'When the report is complete, copy the full URL from your browser address bar',
      'Now go to: https://www.mylife.com/privacyrequest',
      'Scroll to the bottom of the page and paste the copied URL into the "Enter the profile URL for your profile listing" box',
      'Scroll back to the top of the page and fill in all required information',
      'When you reach the Email Validator: enter your email, click Verify, enter the code sent to your email, and click Confirm Code — you should see a green message: "Your email has been successfully verified"',
      'Complete the remaining required fields, verify you are not a robot, then click Submit',
      'You should see the confirmation: "Request Submitted! Your opt-out / deletion request has been submitted. A confirmation email will be sent to the email address you provided within 30 minutes."',
    ],
    verify: 'Email code verification required',
    time: '10 min',
  },
  {
    priority: 'MEDIUM',
    name: 'ThatsThem',
    url: 'https://thatsthem.com/optout',
    steps: [
      'Visit the URL above',
      'Enter the requested information on the Submit Opt-Out Request form',
      'Click "Submit Opt-Out Request"',
      'You are done — no email verification required',
    ],
    verify: 'No verification required',
    time: '2 min',
  },
  {
    priority: 'MEDIUM',
    name: 'Pipl',
    url: 'https://pipl.com/personal-information-removal-request/',
    steps: [
      'Visit the URL above',
      'Accept all cookies if prompted',
      'Enter the requested information on the General Deletion or Disclosure page',
      '(Note: For "Type", select Disclosure + Deletion)',
      '(Note: For "Message", copy and paste the following: "To Whom It May Concern: I am formally submitting this request pursuant to all applicable federal and local consumer protection laws and my fundamental right to privacy, to exercise my rights to (1) disclosure of all personal information you hold on me, and (2) permanent deletion of all such data from your systems, databases, and any third-party sources to which it has been disclosed or sold. I do not consent to, nor authorize, the continued collection, retention, sale, sharing, or processing of my personal information in any form. Please confirm in writing that this request has been received and fulfilled within a reasonable timeframe. Failure to comply may result in a formal complaint filed with the Federal Trade Commission and applicable local consumer protection authorities.")',
      'Solve the math problem (Note: There really is a math problem you must solve before continuing!)',
      'Verify you are not a robot and click Submit',
      'Check your email for a message from Pipl and open it',
      'You are done — continue to monitor your email for any follow-up messages and instructions from Pipl',
    ],
    verify: 'Email verification required',
    time: '5 min',
  },
  {
    priority: 'MEDIUM',
    name: 'PeopleSmart',
    url: 'https://www.peoplesmart.com/optout-go',
    steps: [
      'Visit the URL above',
      'On the left side of the page, locate the menu and click "Opt-Out"',
      'Enter the requested information and click Search to find your record (this site may or may not have your information)',
      'Use the filter menu on the left to narrow your search — try adding your middle name or initial to help narrow the results',
      'Once you locate your record, click the "Optout" button next to it',
      'Confirm you are not a robot',
      'Enter your email address and click "Send Verification Email"',
      'Check your email and follow the instructions through to completion — Note: this email may be delayed; continue working on other opt-outs while you wait',
    ],
    verify: 'Email verification required',
    time: '5 min',
  },
  {
    priority: 'MEDIUM',
    name: 'Addresses.com (via PeopleConnect)',
    url: 'https://www.addresses.com',
    steps: [
      'Visit the URL above',
      'Agree to policy if prompted',
      'Scroll to the very bottom of the page and click "Exercise My Data Privacy Rights"',
      'This will redirect you to the Intelius Data Privacy Center',
      'Click "View User Data Tools"',
      'Scroll down to the "Right to Opt Out" section',
      'Click "Open Cookie Preferences"',
      'Check "Do Not Sell or Share My Personal Information", then click "Save My Preferences"',
      'You will see a message: "Your opt out preferences has been honored" — this window will close automatically, or click the "X" at the top right to close it',
      'Continuing under "Right to Opt Out", enter the requested information',
      'Click "Submit"',
      'You should now see a green message: "Opt out successful"',
      'Scroll down to the "Right to Delete" section',
      'If your email address has not been auto-populated, enter it',
      'Click "Delete My User Data"',
      'You will receive a green message: "Your deletion request has been submitted! You must complete the process by clicking the link sent to your email"',
      'Check your email for the message "Your deletion request for Intelius has been processed"',
      'If Addresses.com has your information, follow the instructions in the email — if it does not have your information, you have completed this opt-out',
      '⚠️ Note: Under "Right to Delete", a second message will appear after clicking "Delete My User Data" that reads: "Deleting your User Data will NOT prevent other users from searching for your Public Data through our services. To suppress your information from appearing in Background Reports on our website, please create a Suppression Request." If you click the Suppression Request link, it will re-route you to the PeopleConnect Suppression Center — follow steps 18–28 below to complete suppression',
      'Enter your email address in the PeopleConnect Suppression Center',
      'Agree to terms and click Continue',
      'Check your email for a "Confirm your email address" message and click on it to open',
      'Once the email is open, click "Verify Email" — this will take you back to Addresses.com/PeopleConnect',
      'If not already auto-populated, enter your date of birth, verify it is correct, and click Continue',
      'If not already auto-populated, enter your legal name, verify it is correct, and click Continue',
      'Select the record that describes you and click Continue',
      'PeopleConnect will verify your identity via your email address — click Continue',
      'You should now be on the Control page — click the dropdown arrow in the "Desired Behavior" bar, select "Suppressed", then click Save',
      'After a brief pause, the Control page will return the message: "This identity\'s Background Report is currently configured as suppressed across our people search websites"',
      'Your identity is now suppressed — you may close the browser and continue other activities',
    ],
    verify: 'Email verification required + optional PeopleConnect suppression',
    time: '15 min',
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

    // ── Browser cleanup warning ────────────────────────────────────────
    doc.moveDown(1);
    const warnX = doc.page.margins.left;
    const warnWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const warnY = doc.y;
    doc.save();
    doc.rect(warnX, warnY, warnWidth, 110).fill('#fff8e1').stroke('#e6a800');
    doc.restore();
    doc
      .fontSize(10)
      .fillColor('#b45309')
      .font('Helvetica-Bold')
      .text('⚠  FINAL STEP — Clear Your Browser Data', warnX + 10, warnY + 10, { width: warnWidth - 20 });
    doc.moveDown(0.4);
    doc
      .fontSize(9)
      .fillColor('#374151')
      .font('Helvetica')
      .text(
        'During the opt-out process, data broker websites may have stored tracking cookies, cached session data, and ' +
        'browsing history on your device. These locally stored tracking identifiers and session tokens can allow data ' +
        'brokers to re-identify you on future visits. To fully sever these residual tracking connections, complete the ' +
        'following steps in your browser after finishing all opt-outs:',
        warnX + 10, doc.y, { width: warnWidth - 20 }
      );
    doc.moveDown(0.4);
    const steps = [
      '1.  Clear your browsing history (all time)',
      '2.  Delete all cached site data and stored browser cache',
      '3.  Remove all cookies and site data stored during this session',
      '4.  If available, enable your browser\u2019s privacy or incognito mode for any future data broker visits',
    ];
    for (const s of steps) {
      doc
        .fontSize(9)
        .fillColor('#374151')
        .font('Helvetica')
        .text(s, warnX + 14, doc.y, { width: warnWidth - 24 });
      doc.moveDown(0.25);
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
