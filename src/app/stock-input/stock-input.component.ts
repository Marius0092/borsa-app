import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../model/stock.model';

@Component({
  selector: 'app-stock-input',
  templateUrl: './stock-input.component.html',
  styleUrls: ['./stock-input.component.css'],
})
export class StockInputComponent {
  value!: string;
  stocks: Stock[] = [];
  constructor(private http: HttpClient) {}

  searchStocks() {
    if (this.value) {
      const apiKey = 'bu4f8kn48v6uehqi3cqg';
      const apiUrl = `https://finnhub.io/api/v1/search?q=${this.value}&token=${apiKey}`;

      this.http.get<any>(apiUrl).subscribe((response) => {
        console.log(response);
        if (response && response.result && response.result.length > 0) {
          this.stocks = response.result.map((item: any) => ({
            nameCompany: `${item.description} (${item.displaySymbol})`,
            initialPrice: 0,
            currentPrice: 0,
            displaySymbol: item.displaySymbol,
          }));
        } else {
          this.stocks = [];
        }
      });
    } else {
      this.stocks = [];
    }
  }

  clearInput() {
    this.value = '';
    this.stocks = [];
  }
}
