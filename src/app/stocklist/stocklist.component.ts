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

  //Cancello uno stock della lista
  deleteStock(stock: Stock) {
    this.stockService.deleteStock(stock);
  }

  //Mostra il dettaglio di uno stock e ci indirizza all'url dedicato con estensione /:displaySymbol
  showDetails(displaySymbol: String) {
    this.router.navigateByUrl('stocks/' + displaySymbol);
  }

  //get alla lista degli stocks$ del service
  get stocks$() {
    return this.stockService.stocks$;
  }
}
