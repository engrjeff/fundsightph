import { FundType } from "@/app/generated/prisma/enums";

const banks = [
  { name: "BDO", logo: "/assets/bank-logos/logo-bdo.png" },
  { name: "BPI", logo: "/assets/bank-logos/logo-bpi.png" },
  {
    name: "China Bank",
    logo: "/assets/bank-logos/logo-chinabank.jpeg",
  },
  {
    name: "EastWest",
    logo: "/assets/bank-logos/logo-eastwest.png",
  },
  {
    name: "Landbank",
    logo: "/assets/bank-logos/logo-landbank.jpeg",
  },
  {
    name: "Metrobank",
    logo: "/assets/bank-logos/logo-metrobank.jpeg",
  },

  { name: "PNB", logo: "/assets/bank-logos/logo-pnb.png" },
  { name: "RCBC", logo: "/assets/bank-logos/logo-rcbc.jpeg" },
  {
    name: "Security Bank",
    logo: "/assets/bank-logos/logo-securitybank.jpeg",
  },
  {
    name: "UnionBank",
    logo: "/assets/bank-logos/logo-unionbank.jpeg",
  },
];

const ewallets = [
  { name: "Atome", logo: "/assets/bank-logos/logo-atome.jpeg" },
  { name: "GCash", logo: "/assets/bank-logos/logo-gcash.jpeg" },
  {
    name: "GoTyme",
    logo: "/assets/bank-logos/logo-gotyme.jpeg",
  },
  { name: "Maya", logo: "/assets/bank-logos/logo-maya.jpeg" },

  {
    name: "PayPal",
    logo: "/assets/bank-logos/logo-paypal.jpeg",
  },
  {
    name: "SeaBank",
    logo: "/assets/bank-logos/logo-seabank.jpeg",
  },
  { name: "Wise", logo: "/assets/bank-logos/logo-wise.png" },
];

const government = [
  {
    name: "PAG-IBIG",
    logo: "/assets/bank-logos/logo-pagibig.jpeg",
  },
];

const cash = [
  {
    name: "Coins Icon",
    logo: "coins",
  },
  {
    name: "Hand Coins Icon",
    logo: "hand-coins",
  },
  {
    name: "Banknote Icon",
    logo: "banknote",
  },
  {
    name: "Piggy Bank Icon",
    logo: "piggy-bank",
  },
];

export const FUND_ICONS: Record<
  FundType,
  Array<{ name: string; logo: string }>
> = {
  [FundType.BANK]: banks,
  [FundType.E_WALLET]: ewallets,
  [FundType.CASH]: cash,
  [FundType.OTHER]: government,
};
