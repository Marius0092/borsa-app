import { Component } from '@angular/core';
import { StockService } from '../service/stock.service';
import { Stock } from '../model/stock.model';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css'],
})
export class StocklistComponent {
  constructor(private stockService: StockService) {}

  deleteStock(stock: Stock) {
    this.stockService.deleteStock(stock);
  }

  get stocks$() {
    return this.stockService.stocks$;
  }
}
