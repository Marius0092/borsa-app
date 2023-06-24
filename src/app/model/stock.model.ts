export interface Stock {
  nameCompany: string;
  displaySymbol: string;
  initialPrice: number;
  currentPrice: number;
  currency: string;
  logo: number;

  currentDate: InsiderSentiment;
  twoMonthAgo: InsiderSentiment;
  oneMonthAgo: InsiderSentiment;
}

export interface InsiderSentiment {
  change: number;
  month: number;
  year: number;
}
