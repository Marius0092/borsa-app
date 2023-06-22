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
    const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${token}`;
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`;

    this.http.get<any>(profileUrl).subscribe(
      (profileResponse) => {
        this.http.get<any>(quoteUrl).subscribe(
          (quoteResponse) => {
            const stockData: Stock = {
              nameCompany: profileResponse.name,
              displaySymbol: profileResponse.ticker,
              initialPrice: quoteResponse.pc,
              currentPrice: quoteResponse.c,
              logo: profileResponse.logo,
            };

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

}
