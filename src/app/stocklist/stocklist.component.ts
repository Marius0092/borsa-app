import { Component } from '@angular/core';
import { Stock } from '../model/stock.model';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css'],
})
export class StocklistComponent {
  stocks: Stock[] = [
    {
      nameCompany: 'Apple',
      initialPrice: 3252,
      currentPrice: 3827,
      displaySymbol: 'APL',
    },
    {
      nameCompany: 'Microsoft',
      initialPrice: 3252,
      currentPrice: 3827,
      displaySymbol: 'MSF',
    },
    {
      nameCompany: 'Dell',
      initialPrice: 3252,
      currentPrice: 3827,
      displaySymbol: 'DELL',
    },
  ];
}
