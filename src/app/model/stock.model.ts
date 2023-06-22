export interface Stock {
  nameCompany: String;
  displaySymbol: String;
  initialPrice: Number;
  currentPrice: Number;
  currency: String;
  logo: String;

  currentDate?: InsiderSentiment;
  twoMonthAgo?: InsiderSentiment;
  oneMonthAgo?: InsiderSentiment;
}

export interface InsiderSentiment {
  change?: Number;
  month?: Number;
  year?: Number;
}
