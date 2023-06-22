import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock.model';
import { StockService } from '../service/stock.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css'],
})
export class StockDetailsComponent implements OnInit {
  public stockData: Stock | null = null;

  constructor(private stockService: StockService, private location: Location) {}

  ngOnInit(): void {
    this.stockService.stocks$.subscribe((stocks: Stock[]) => {
      // Assuming you want to display the first stock in the list
      if (stocks.length > 0) {
        this.stockData = stocks[0];
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
