import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stock } from '../model/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stocksSubject = new BehaviorSubject<Stock[]>([]);
  public stocks$ = this.stocksSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchStockProfileAndQuote(symbol: string, token: string): void {
    const today = new Date();
    const currentDate = this.formatDate(today);

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(today.getMonth() - 2);
    const lastDate = this.formatDate(twoMonthsAgo);
    console.log('Current Date:', currentDate);
    console.log('Last Date:', lastDate);

    const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${token}`;
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`;
    const insiderSentimentUrl = `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&from=${lastDate}&to=${currentDate}&token=${token}`

    this.http.get<any>(profileUrl).subscribe(
      (profileResponse) => {
        this.http.get<any>(quoteUrl).subscribe(
          (quoteResponse) => {
           this.http.get<any>(insiderSentimentUrl).subscribe(
            (insiderResponse) => {
              const stockData: Stock = {
                nameCompany: profileResponse.name,
                displaySymbol: profileResponse.ticker,
                initialPrice: quoteResponse.pc,
                currentPrice: quoteResponse.c,
                logo: profileResponse.logo,
                currency: profileResponse.currency,

                currentDate: insiderResponse.data[insiderResponse.data.length-1].change,
                oneMonthAgo: insiderResponse?.data[insiderResponse.data.length-2].change,
                twoMonthAgo: insiderResponse?.data[insiderResponse.data.length-3].change,

              };
              console.log(stockData)
              console.log(insiderResponse)

              //Copia la lista attuale
              const currentStocks = this.stocksSubject.value;
              console.log(currentStocks);

              //Pusha i dati dello stockData che otteniamo dalla risposta
              currentStocks.push(stockData);
              this.stocksSubject.next(currentStocks);
            },
            (error) => {
              console.log('Error fetching stock quote:', error);
            }
           )
          }
        );
      },
      (error) => {
        console.log('Error fetching stock profile:', error);
      }
    );
  }

  deleteStock(stock: Stock) {
    const currentStocks = this.stocksSubject.getValue();
    const updatedStocks = currentStocks.filter((s) => s.displaySymbol !== stock.displaySymbol);
    this.stocksSubject.next(updatedStocks);
  }

  formatDate (date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  }
}
