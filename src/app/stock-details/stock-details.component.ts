import { Component, OnDestroy, OnInit } from '@angular/core';
import { Stock } from '../model/stock.model';
import { StockService } from '../service/stock.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css'],
})
export class StockDetailsComponent implements OnInit, OnDestroy {
  public stockData: Stock | null = null;
  private stocksSubscription: Subscription | undefined;

  constructor(
    private stockService: StockService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.stocksSubscription = this.stockService.stocks$.subscribe(
      (stocks: Stock[]) => {
        // tramite params ottengo il symbol
        this.route.params.subscribe((params) => {
          const symbol = params['displaySymbol'];
          //Ottengo lo stock interessato
          this.stockData =
            stocks.find((stock) => stock.displaySymbol === symbol) || null;
        });
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
