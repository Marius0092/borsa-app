import { Component } from '@angular/core';
import { StockService } from '../service/stock.service';

@Component({
  selector: 'app-stock-input',
  templateUrl: './stock-input.component.html',
  styleUrls: ['./stock-input.component.css'],
})
export class StockInputComponent {
  symbol!: string;
  token: string = 'bu4f8kn48v6uehqi3cqg';

  constructor(private stockService: StockService) {}

  fetchStockProfileAndQuote(): void {
    if (this.symbol && this.token) {
      this.stockService.fetchStockProfileAndQuote(this.symbol, this.token);
    }
  }



  get stocks$() {
    return this.stockService.stocks$;
  }
}
