import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stocksSubject = new BehaviorSubject<any[]>([]);
  public stocks$ = this.stocksSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchStockProfile(symbol: string, token: string): void {
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${token}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        console.log(response);
        const currentStocks = this.stocksSubject.value;
        currentStocks.push(response);
        this.stocksSubject.next(currentStocks);
      },
      (error) => {
        console.log('Error fetching stock profile:', error);
      }
    );
  }
}
