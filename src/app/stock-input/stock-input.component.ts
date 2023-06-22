import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Stock } from '../model/stock.model';
import { FormsModule } from '@angular/forms';
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

  fetchStockProfile(): void {
    if (this.symbol && this.token) {
      this.stockService.fetchStockProfile(this.symbol, this.token);
    }
  }

  get stocks$() {
    return this.stockService.stocks$;
  }
}
