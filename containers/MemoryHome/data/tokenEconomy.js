// Token utility model. Allocation sizes are TBD.
export const allocations = [
  { name: "Team", color: "#d8c2f4" },
  { name: "Private investors & angels", color: "#91b4cf" },
  { name: "Liquidity pool", color: "#a9cbd0" },
  { name: "Protocol safeguard", color: "#b59bd0" },
  { name: "Community & ecosystem", color: "#9799ce" },
];

export const utilities = [
  {
    id: "lock",
    name: "Lock for credits",
    icon: "shield",
    label: "Tokens are locked",
    title: "Lock for service credits.",
    body: "Commit tokens for a defined term and receive a reserved service-credit balance. Your tokens stay locked while you use the credits.",
    steps: [
      [
        "Review the terms",
        "See the token amount, release date, credits and expiry.",
      ],
      ["Use the credits", "Spend on eligible services at the published rates."],
      ["At maturity", "Withdraw the committed token amount, or renew."],
    ],
    note: "Using credits does not reduce your locked token balance. Holding tokens alone does not generate credits.",
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
