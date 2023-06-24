import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { Stock } from '../model/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stocksSubject = new BehaviorSubject<Stock[]>([]);
  public stocks$ = this.stocksSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchStock(symbol: string, token: string): void {
    const today = new Date();
    const currentDate = this.formatDate(today);

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(today.getMonth() - 2);
    const lastDate = this.formatDate(twoMonthsAgo);
    console.log('Current Date:', currentDate);
    console.log('Last Date:', lastDate);

    const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${token}`;
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`;
    const insiderSentimentUrl = `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&from=${lastDate}&to=${currentDate}&token=${token}`;

    //Combina 3 chiamate http

    //Chiamata http al profileUrl
    this.http
      .get<any>(profileUrl)
      .pipe(
        switchMap((profileResponse) => {
          //Chiamata http al quoteUrl
          return this.http.get<any>(quoteUrl).pipe(
            switchMap((quoteResponse) => {
              //Chiamata http all'insiderSentimentUrl
              return this.http.get<any>(insiderSentimentUrl).pipe(
                switchMap((insiderResponse) => {
                  //Compongo stockData con gli attributi che m'interessano
                  const stockData: Stock = {
                    nameCompany: profileResponse.name,
                    displaySymbol: profileResponse.ticker,
                    initialPrice: quoteResponse.pc,
                    currentPrice: quoteResponse.c,
                    logo: profileResponse.logo,
                    currency: profileResponse.currency
                      ? profileResponse.currency
                      : 2,
                    currentDate: {
                      change: insiderResponse?.data[
                        insiderResponse.data.length - 1
                      ].change
                        ? insiderResponse?.data[insiderResponse.data.length - 1]
                            .change
                        : 0,
                      month: insiderResponse?.data[
                        insiderResponse.data.length - 1
                      ].month
                        ? insiderResponse?.data[insiderResponse.data.length - 1]
                            .month
                        : '',
                      year: insiderResponse?.data[
                        insiderResponse.data.length - 1
                      ].year
                        ? insiderResponse?.data[insiderResponse.data.length - 1]
                            .year
                        : '',
                    },

                    oneMonthAgo: {
                      change: insiderResponse.data[
                        insiderResponse.data.length - 2
                      ]?.change
                        ? insiderResponse.data[insiderResponse.data.length - 2]
                            ?.change
                        : 0,
                      month: insiderResponse.data[
                        insiderResponse.data.length - 2
                      ]?.month
                        ? insiderResponse.data[insiderResponse.data.length - 2]
                            ?.month
                        : '',
                      year: insiderResponse.data[
                        insiderResponse.data.length - 2
                      ]?.year
                        ? insiderResponse.data[insiderResponse.data.length - 2]
                            ?.year
                        : 0,
                    },
                    twoMonthAgo: {
                      change: insiderResponse.data[
                        insiderResponse.data.length - 3
                      ]?.change
                        ? insiderResponse.data[insiderResponse.data.length - 3]
                            ?.change
                        : 0,
                      month: insiderResponse.data[
                        insiderResponse.data.length - 3
                      ]?.month
                        ? insiderResponse.data[insiderResponse.data.length - 3]
                            ?.month
                        : '',
                      year: insiderResponse.data[
                        insiderResponse.data.length - 3
                      ]?.year
                        ? insiderResponse.data[insiderResponse.data.length - 3]
                            ?.year
                        : '',
                    },
                  };

                  console.log(stockData);
                  console.log(insiderResponse);

                  //Copia della lista attuale
                  const currentStocks = this.stocksSubject.value;
                  console.log(currentStocks);

                  //boolean che indica se è già presente uno stock nella lista che contiene quel symbol
                  const isSymbolInStockList = (
                    symbol: String,
                    stockList: Stock[]
                  ): boolean => {
                    return stockList.some(
                      (stock) => stock.displaySymbol === symbol
                    );
                  };

                  const isSymbolPresent = isSymbolInStockList(
                    stockData.displaySymbol,
                    currentStocks
                  );

                  // Pusha stockData se non esiste già nella lista copia
                  if (!isSymbolPresent) {
                    currentStocks.push(stockData);
                  } else {
                    alert('ticker già presente in lista');
                  }

                  //Aggiorno la lista stockSubject con l'aggiunta di stockData
                  this.stocksSubject.next(currentStocks);

                  // In caso di errore, si connette a catchError
                  return of(null);
                }),
                catchError((error) => {
                  console.log('Error fetching insider sentiment:', error);
                  // Gestisce l'errore
                  return of(null);
                })
              );
            }),
            catchError((error) => {
              console.log('Error fetching stock quote:', error);
              // Gestisce l'errore
              return of(null);
            })
          );
        }),
        catchError((error) => {
          console.log('Error fetching stock profile:', error);
          // Gestisce l'errore
          return of(null);
        })
      )
      .subscribe();
  }

  //Cancella uno stock dalla lista StocksSubject confrontando il displaySymbol
  deleteStock(stock: Stock) {
    const currentStocks = this.stocksSubject.getValue();
    const updatedStocks = currentStocks.filter(
      (s) => s.displaySymbol !== stock.displaySymbol
    );
    this.stocksSubject.next(updatedStocks);
  }

  //Formattazione della data in YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
