// Token facts and allocation. The page, the allocation chart and the
// /token.md crawler version all read from here.
export const tokenFacts = {
  totalSupply: 1_000_000_000,
  ticker: "$LLL",
  totalSupplyLabel: "1B",
  network: "Robinhood Chain",
  launchDate: "14 October 2026",
  contractAddress: "0xfC5A5c521C80d8e1d6B5Aee6454B8C9483C91BFf",
  virtualsUrl: "https://app.virtuals.io/virtuals/144804",
};

// Shares are percentages of total supply and must sum to 100; the chart
// draws each slice in proportion.
export const allocations = [
  { name: "Automated Capital Formation (ACF)", share: 25, color: "#b59bd0" },
  { name: "Team", share: 25, color: "#d8c2f4" },
  { name: "Investors & advisors", share: 15.69, color: "#91b4cf" },
  {
    name: "Ecosystem, staking rewards & market making",
    share: 10.31,
    color: "#9799ce",
  },
  { name: "Liquidity pools", share: 24, color: "#a9cbd0" },
];

export const utilities = [
  {
    id: "lock",
    name: "Stake and lock for credits",
    icon: "shield",
    label: "Tokens are staked and locked",
    title: "Stake and lock for service credits.",
    body: "Stake and lock tokens for a defined term and receive a reserved service-credit balance. Your tokens stay staked and locked while you use the credits.",
    steps: [
      [
        "Review the terms",
        "See the token amount, release date, credits and expiry.",
      ],
      ["Use the credits", "Spend on eligible services at the published rates."],
      ["At maturity", "Withdraw the committed token amount, or renew."],
    ],
    note: "Using credits does not reduce your staked and locked token balance. Holding tokens alone does not generate credits.",
  },
  {
    id: "pay",
    name: "Pay for services",
    icon: "exchange",
    label: "Tokens are spent",
    title: "Pay for memory and storage.",
    body: "Spend tokens on a plan, storage renewal or credit top-up. Services are priced in USD, with the token amount quoted before payment.",
    steps: [
      ["Choose a service", "Select a plan, renewal or additional usage."],
      ["Review the quote", "Check the token amount, fees and quote expiry."],
      [
        "Confirm payment",
        "Later token-price changes do not alter the purchase.",
      ],
    ],
    note: "Fiat and supported stablecoin payments remain available.",
  },
];

export const floors = [
  { id: "token-overview", label: "Overview" },
  { id: "token-utility", label: "Utility" },
  { id: "token-credits", label: "Credits" },
  { id: "token-allocation", label: "Tokenomics" },
];
