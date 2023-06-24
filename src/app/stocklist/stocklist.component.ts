import { Component } from '@angular/core';
import { StockService } from '../service/stock.service';
import { Stock } from '../model/stock.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css'],
})
export class StocklistComponent {
  constructor(private stockService: StockService, private router: Router) {}

  //Cancella lo stock interessato dalla lista
  deleteStock(stock: Stock) {
    this.stockService.deleteStock(stock);
  }

  //Accede al dettaglio
  showDetails(displaySymbol: String) {
    this.router.navigateByUrl('stocks/' + displaySymbol);
  }

  get stocks$() {
    return this.stockService.stocks$;
  }
}
