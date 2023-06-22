export interface Stock {
  nameCompany: String;
  displaySymbol: String;
  initialPrice: Number;
  currentPrice: Number;
  logo: String;
  currentDate?: String;
  twoMonthAgo?: String;
  oneMonthAgo?: String;
  currency: String;

  /* prePreviousValue: Number;
  previousValue: Number;
  currentValue: Number; */
}

/* export interface StockDetail extends Stock {
  prePreviousValue: Number;
  previousValue: Number;
  currentValue: Number;
}
 */
