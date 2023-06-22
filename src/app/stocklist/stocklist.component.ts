import { Component } from '@angular/core';
import { StockService } from '../service/stock.service';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css'],
})
export class StocklistComponent {
  constructor(private stockService: StockService) {}

  get stocks$() {
    return this.stockService.stocks$;
  }
}
