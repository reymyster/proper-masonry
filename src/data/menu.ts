type MenuItem = {
  title: string;
  children?: MenuItem[];
};

export const AccountingMenuData: MenuItem[] = [
  { title: "AR Credit Limit", children: [{ title: "Manage AR Credit" }] },
  {
    title: "Bank",
    children: [
      { title: "Accounts For Deposit" },
      { title: "Bank Account Periods" },
      { title: "Bank Card Batch Posting" },
      { title: "Bank Map Info" },
      { title: "Bank Reconciliation" },
      { title: "Bank Routing Codes" },
      { title: "GL Account - Bank Info" },
      { title: "Ticket AutoPost" },
    ],
  },
  {
    title: "Account Detail",
  },
  {
    title: "Entries to Review",
  },
  {
    title: "Concur",
    children: [{ title: "Account Mapping" }],
  },
  {
    title: "Forex",
    children: [
      {
        title: "Inventory",
        children: [
          { title: "Trading Sheet Calculator" },
          { title: "Trading Sheet Setup" },
          { title: "Trading Position" },
        ],
      },
      { title: "Current Rate" },
      { title: "List Tickets" },
    ],
  },
  {
    title: "Import Files",
  },
  {
    title: "Journals",
    children: [
      { title: "List Journals" },
      { title: "PushBack Requests" },
      { title: "Recurring JEs" },
    ],
  },
  {
    title: "Fixed Assets",
    children: [
      { title: "Manage Fixed Assets" },
      { title: "Assets to Setup" },
      { title: "Import Fixed Assets" },
    ],
  },
  {
    title: "Reports",
    children: [{ title: "BSIS Reports" }],
  },
  {
    title: "Receivables",
    children: [
      { title: "Agent Deposit Upload" },
      { title: "Agent Reconciliation" },
      { title: "Settlement Files - Amex" },
      { title: "Settlement Files - Walmart" },
      { title: "Agent Credit Management" },
      { title: "Agent AR & Daily Limits" },
    ],
  },
  {
    title: "Payables",
    children: [{ title: "Pay Correspondents" }],
  },
  {
    title: "Settlements",
    children: [
      { title: "Positive Pay Logs" },
      { title: "Print Checks Approval Queue" },
      { title: "Walmart Reconciliation" },
    ],
  },
  {
    title: "Setup",
    children: [
      { title: "Manage Departments" },
      {
        title: "Accounts",
        children: [
          { title: "Manage Chart of Accounts" },
          { title: "External Chart of Accounts" },
          { title: "Chart of Accounts Groups" },
        ],
      },
      {
        title: "Division",
        children: [
          { title: "Manage Divisions" },
          { title: "Manage Division Groups" },
        ],
      },
      {
        title: "Trading Cutoff Time",
      },
      {
        title: "Inventory",
        children: [
          { title: "View Currencies" },
          { title: "View Currency Decimals" },
          { title: "Currency Market Rates" },
        ],
      },
      {
        title: "Lock Financials",
      },
      { title: "Posting Mappings" },
      { title: "Journal Review Criteria" },
    ],
  },
  {
    title: "Market Revaluation",
    children: [{ title: "Rates" }, { title: "History" }, { title: "Revalue" }],
  },
  {
    title: "Correspondent Payment",
    children: [
      { title: "Forecast", children: [{ title: "Setup" }] },
      { title: "Month End Commission" },
    ],
  },
];
