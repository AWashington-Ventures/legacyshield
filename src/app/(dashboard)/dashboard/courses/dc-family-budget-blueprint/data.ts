export interface Lesson {
  id: number;
  slug: string;
  title: string;
  duration: string;
  videoId: string | null;
  content: string[];
  keyTakeaways: string[];
  actionStep: string;
  downloadUrl?: string | null;
  downloadLabel?: string | null;
}
export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  totalLessons: number;
  totalDuration: string;
  level: string;
  lessons: Lesson[];
}
export const course: Course = {
  id: 'dc-family-budget-blueprint',
  title: 'DC Family Budget Blueprint',
  description: 'A budgeting framework built for DMV Area cost of living — not generic finance advice that ignores where you actually live. Real numbers, real strategies, for real DC families.',
  icon: '📊',
  totalLessons: 4,
  totalDuration: '25 min',
  level: 'Beginner',
  lessons: [
    {
      id: 1,
      slug: 'dc-cost-of-living-reality-check',
      title: 'DC Cost of Living: The Reality Check',
      duration: '6 min',
      videoId: null,
      content: [
        '"Generic financial advice tells you to spend no more than 30% of your income on housing. In DC, that advice can feel like a joke. We have to build budgets that work in the real world — this one." — Anthony Washington',
        '**The DC metro area cost of living by the numbers.** Washington DC consistently ranks among the top five most expensive metropolitan areas in the United States. The median monthly rent for a two-bedroom apartment in DC proper is approximately $2,800 to $3,400 as of 2025. In Northern Virginia suburbs like Arlington and Alexandria, comparable housing runs $2,400 to $3,000. In Prince George\'s County and outer Maryland suburbs, you can find $1,600 to $2,200 — still well above the national median.',
        '**What DC families are actually spending.** According to the DC Fiscal Policy Institute, a family of four in Washington DC needs approximately $110,000 to $130,000 per year to meet basic expenses — housing, food, transportation, childcare, and healthcare — without any savings or discretionary spending. A single adult needs approximately $60,000 to $70,000. These numbers explain why so many working families feel like they are falling behind even with steady employment.',
        '**The hidden costs that devastate DC budgets.** Transportation in the DMV is among the costliest in the nation. Metro fares, car insurance, parking, and traffic-related costs add up. Childcare in DC averages $2,000 to $3,000 per month per child — among the highest in the country. Property taxes, HOA fees, and utility costs in the region are all above national averages. A budget that ignores these realities will fail.',
        '**Income vs. cost: The gap that traps working families.** The median household income in Washington DC is approximately $90,000 — but that figure is heavily skewed by high-income earners in the northwest quadrant. For working-class and middle-class families in Wards 7 and 8, Southeast DC, and parts of PG County and Prince William County, household incomes of $45,000 to $70,000 are common — creating a significant gap between what families earn and what it actually costs to live here.',
        '**Why generic budgeting advice fails DMV families.** Most personal finance content is written for a national average cost of living that does not exist in our region. The advice to save 20% of your income while renting in DC may be mathematically impossible for a family earning $60,000. This course acknowledges that reality and builds a framework that works within the actual constraints DMV families face — while still building progress toward financial security.',
      ],
      keyTakeaways: [
        'DC is one of the five most expensive metro areas in the US — generic budget advice often does not apply',
        'A family of four in DC needs $110,000–$130,000 just to cover basic expenses without savings',
        'Childcare ($2,000–$3,000/month per child) and transportation are major hidden budget destroyers',
        'The median income for working-class DC families creates a real gap with actual cost of living',
        'Your budget must be built for DC — not for a national average that does not exist here',
      ],
      actionStep: 'Calculate your real monthly income after taxes this week. Then list your five largest monthly expenses: housing, transportation, childcare, food, and debt payments. Add them up. Compare that total to your take-home pay. The gap — or lack of one — is where we start building your DC budget.',
    },
    {
      id: 2,
      slug: 'the-5030-20-rule-adjusted-for-dc',
      title: 'The 50/30/20 Rule — Adjusted for DC',
      duration: '6 min',
      videoId: null,
      content: [
        '"Every budget framework starts as a suggestion. Your job is to take the suggestion and make it fit your real life. Nobody else is living in your zip code, earning your income, and raising your family. The numbers have to work for you." — Anthony Washington',
        '**What is the 50/30/20 rule?** The 50/30/20 rule is a simple budgeting framework popularized by Senator Elizabeth Warren in her book All Your Worth. It divides your after-tax income into three categories: 50% toward needs (housing, utilities, groceries, transportation, minimum debt payments), 30% toward wants (dining out, entertainment, subscriptions, clothing beyond basics), and 20% toward savings and debt payoff above minimums.',
        '**Why the standard 50/30/20 breaks down in DC.** For a family earning $75,000 after taxes (roughly $6,250/month), the standard framework allocates $3,125 for needs. But rent alone often consumes $2,500 to $3,000 — leaving almost nothing for transportation, utilities, groceries, and debt minimums. If you are in this situation, the standard 50/30/20 is not a realistic starting point. And that does not mean you have failed — it means you need a framework built for your reality.',
        '**The DC-Adjusted Framework: 65/15/20.** For many DMV working families, a more realistic starting split is 65% needs, 15% wants, and 20% savings and debt. This acknowledges the actual cost of housing and childcare in the region while still protecting the critical 20% for financial progress. The goal over time is to reduce your needs percentage as income grows or housing costs change — not to force yourself into an impossible standard.',
        '**The Priority Stack: When 20% is not possible.** If you cannot hit 20% savings immediately, use a priority stack. First: contribute at least enough to your employer\'s 401k to capture any matching contribution — that is an immediate 50 to 100 percent return. Second: build a $1,000 starter emergency fund. Third: pay off all predatory debt (payday loans, title loans). Fourth: build your emergency fund to one month of expenses. Fifth: begin investing beyond your employer match. Progress beats perfection every time.',
        '**The Needs Audit.** Many families include expenses in their needs category that are actually wants or choices. Streaming subscriptions, premium cable, frequent restaurant meals, brand-name groceries, and a car payment on a vehicle above your actual transportation need are common examples. A needs audit asks: if I had to cut spending tomorrow to survive, what would I keep? What remains after that audit is your true needs baseline — and the rest is choices.',
        '**Building your DC budget worksheet.** Start with your real after-tax monthly income. List every recurring expense and categorize it: need, want, or savings and debt. Calculate your actual percentages. Compare to your target framework. Identify the three largest needs expenses and ask whether any of them can be reduced. Identify the three largest wants expenses and decide which, if any, you are willing to reduce.',
      ],
      keyTakeaways: [
        'The 50/30/20 rule allocates after-tax income: 50% needs, 30% wants, 20% savings and debt',
        'In DC, a 65/15/20 split is often more realistic for working families given housing costs',
        'When 20% savings is impossible, use the Priority Stack: 401k match → emergency fund → debt → investing',
        'Do a Needs Audit — many expenses listed as needs are actually wants or choices',
        'Progress beats perfection — any movement toward your target framework is a win',
      ],
      actionStep: 'Download the LegacyShield DC Family Budget Blueprint worksheet at legacyshieldpro.com/worksheets/. Fill in your actual after-tax income and every monthly expense. Calculate your current percentages across needs, wants, and savings. Then identify one want you can reduce by $50 this month and redirect it to savings.',
      downloadUrl: '/DC_Family_Budget_Blueprint.pdf',
      downloadLabel: 'DC Family Budget Blueprint Worksheet',
    },
    {
      id: 3,
      slug: 'tools-to-track-your-spending',
      title: 'Tools to Track Your Spending',
      duration: '6 min',
      videoId: null,
      content: [
        '"In law enforcement, we tracked everything — evidence, incidents, patterns. You cannot manage what you do not measure. Your budget works the same way. Tracking your spending is not about guilt. It is about awareness." — Anthony Washington',
        '**Why most people do not track their spending.** The most common reason people avoid tracking is that they are afraid of what they will find. A close second is that they tried once, found it overwhelming, and gave up. The goal here is not perfection — it is awareness. Even tracking for one month will reveal patterns that will change how you see your money.',
        '**Option 1: The Envelope Method (Cash-Based).** The envelope method is the simplest and most tactile budgeting system. At the beginning of each pay period, withdraw cash for each spending category — groceries, gas, dining out, entertainment — and place it in a labeled envelope. When the envelope is empty, that category is done for the period. No apps required, no technology, no subscriptions. Research shows that spending cash creates more psychological friction than swiping a card — which means you naturally spend less.',
        '**Option 2: Spreadsheet Budgeting.** A simple spreadsheet — Google Sheets is free — gives you complete control and visibility over your finances. Create columns for category, budgeted amount, and actual amount. Update it weekly. The LegacyShield DC Family Budget Blueprint worksheet is a pre-built version you can download and customize at legacyshieldpro.com/worksheets. This method requires discipline but provides the clearest picture of your finances.',
        '**Option 3: Budgeting Apps.** Several apps connect to your bank accounts and automatically categorize spending. YNAB (You Need a Budget) is the gold standard — it uses a zero-based budgeting philosophy that assigns every dollar a job. It costs $14.99 per month or $99 per year but consistently produces the best results for people who use it. Mint (now Credit Karma) is free and good for tracking. EveryDollar is free and simple. Choose the tool that you will actually use.',
        '**The Weekly Money Date.** One of the most effective habits in personal finance is a weekly 15-minute money review. Once a week — Sunday evenings work well for many people — sit down with your budget and your bank statement. Review what you spent, compare it to your plan, and make adjustments for the coming week. This simple habit catches problems early and keeps your financial life from spiraling between paychecks.',
        '**What to look for when you start tracking.** Most people are surprised by three categories: food (restaurants and groceries combined often exceed $800 to $1,200 per month for a family of four), subscriptions (the average household has $200 to $300 per month in recurring subscriptions, many of which are unused), and small purchases (coffee, convenience store stops, and app purchases that seem insignificant individually but add up to $150 to $300 per month).',
      ],
      keyTakeaways: [
        'Tracking spending is about awareness, not guilt — even one month of tracking will reveal surprises',
        'The Envelope Method (cash) creates natural spending friction and requires no technology',
        'YNAB is the most effective app for people serious about budgeting — assigns every dollar a job',
        'A weekly 15-minute money review prevents small problems from becoming big ones',
        'Food, subscriptions, and small purchases are the three most common budget surprises',
      ],
      actionStep: 'Choose one tracking method this week — envelope, spreadsheet, or app — and commit to using it for 30 days. Download the LegacyShield DC Family Budget Blueprint worksheet at legacyshieldpro.com/worksheets as your starting template. Set a recurring 15-minute calendar event each Sunday for your weekly money review.',
      downloadUrl: '/DC_Family_Budget_Blueprint.pdf',
      downloadLabel: 'DC Family Budget Blueprint Worksheet',
    },
    {
      id: 4,
      slug: 'your-30-day-dc-budget-action-plan',
      title: 'Your 30-Day DC Budget Action Plan',
      duration: '7 min',
      videoId: null,
      content: [
        '"A plan without action is just a wish. I have seen what happens when families have no financial plan — I built LegacyShield because of it. Now you have the knowledge. This lesson is about making it real." — Anthony Washington',
        '**Week 1: Know Your Numbers.** Days 1 through 7 are about getting a complete picture. Pull your last 30 days of bank and credit card statements. List every expense and categorize it: housing, transportation, food, childcare, debt, subscriptions, entertainment, and other. Calculate your total monthly income after taxes. Calculate your current savings rate. Most people doing this for the first time are surprised — often by how little is left over, or by specific categories they never noticed.',
        '**Week 2: Build Your DC Budget.** Days 8 through 14 are about designing your plan. Using your actual numbers from Week 1, build a budget that assigns every dollar of your monthly income to a category — needs, wants, savings, or debt. Use the DC-adjusted 65/15/20 framework as your starting point. Identify the three expenses you can reduce. Set specific savings targets: a number for your emergency fund, a number for your debt payoff, and a number for any specific goals like a home purchase or your children\'s education.',
        '**Week 3: Set Up Your Systems.** Days 15 through 21 are about automation and structure. Set up automatic transfers on your payday: a fixed amount to savings, a fixed amount to your debt payoff fund. Enroll in your employer\'s 401k if you have not already — at minimum enough to capture any matching contribution. Set up automatic minimum payments on all debt accounts. Create your weekly money review appointment on your calendar. These systems will do more for your finances than willpower ever will.',
        '**Week 4: Audit and Adjust.** Days 22 through 30 are about honest review. How did you do against your Week 2 plan? Where did you overspend? Where did you underspend? What unexpected expenses appeared? Adjust your budget based on what you learned. Most people need two to three months of iteration before their budget feels accurate and sustainable. The first month is data collection as much as it is discipline.',
        '**The Long Game: Where This Budget Leads.** A consistent budget is not an end in itself — it is the vehicle that gets you somewhere. In 6 months of consistent budgeting, most DC families can build a starter emergency fund of $1,000 to $2,000. In 12 months, they can pay off one or two smaller debts and begin building real savings momentum. In 24 months, the combination of debt elimination, savings growth, and investment contributions begins to create genuine financial breathing room — and the foundation for generational wealth.',
        '**LegacyShield Resources to Keep You on Track.** Download the DC Family Budget Blueprint worksheet at legacyshieldpro.com/worksheets. Use the Net Worth Calculator to track your financial progress quarterly. Revisit the Generational Wealth Playbook to connect your daily budget to your long-term legacy goals. And remember — the community is here. You are not building this alone.',
      ],
      keyTakeaways: [
        'Week 1: Know your numbers — pull 30 days of statements and categorize every expense',
        'Week 2: Build your budget using the DC-adjusted 65/15/20 framework',
        'Week 3: Automate transfers, 401k contributions, and debt payments — remove willpower from the equation',
        'Week 4: Review and adjust — the first month is data collection as much as discipline',
        'Consistent budgeting over 24 months creates genuine financial breathing room and wealth-building momentum',
      ],
      actionStep: 'Start Week 1 today. Pull your last 30 days of statements — bank and credit card — and spend 30 minutes categorizing every transaction. This single act of awareness is the most important financial step most people never take. Download the LegacyShield DC Family Budget Blueprint worksheet at legacyshieldpro.com/worksheets to make it easier.',
      downloadUrl: '/DC_Family_Budget_Blueprint.pdf',
      downloadLabel: 'DC Family Budget Blueprint Worksheet',
    },
  ],
};
