import { Component, OnDestroy, OnInit } from '@angular/core';
import { Stock } from '../model/stock.model';
import { StockService } from '../service/stock.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css'],
})
export class StockDetailsComponent implements OnInit, OnDestroy {
  public stockData: Stock | null = null;
  private stocksSubscription: Subscription | undefined;

  constructor(private stockService: StockService, private location: Location) {}

  ngOnInit(): void {
    this.stocksSubscription = this.stockService.stocks$.subscribe(
      (stocks: Stock[]) => {
        // Assuming you want to display the first stock in the list
        if (stocks.length > 0) {
          this.stockData = stocks[0];
        }
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.stocksSubscription) {
      this.stocksSubscription.unsubscribe();
    }
  }
}
