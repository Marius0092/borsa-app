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

  // Aggiunge lo stock alla lista stock$ del service
  addStock(): void {
    if (this.symbol && this.token) {
      this.stockService.fetchStock(this.symbol, this.token);
    }
  }
}
