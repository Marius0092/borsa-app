import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';
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

    //Chiamata http a profileUrl dove prendo gli attributi name, ticker, logo, currency
    this.http
      .get<any>(profileUrl)
      .pipe(
        switchMap((profileResponse) => {
          const { name, ticker, logo, currency } = profileResponse;

          // Chiamata http a quoteUrl dove prendo gli attributi previous price (pc) e current price (c)
          return this.http.get<any>(quoteUrl).pipe(
            switchMap((quoteResponse) => {
              const { pc, c } = quoteResponse;

              /* Chiamata http a insiderSentimentUrl dove prendo l'attributo data[]
                in cui ciascun elemento rappresenta il sentiment data di ogni mese
                */
              return this.http.get<any>(insiderSentimentUrl).pipe(
                switchMap((insiderResponse) => {
                  const { data } = insiderResponse;

                  //Compongo l'oggetto che andrò ad inserire
                  const stockData: Stock = {
                    nameCompany: name,
                    displaySymbol: ticker,
                    initialPrice: pc,
                    currentPrice: c,
                    logo: logo,
                    currency: currency,
                    currentDate: {
                      change: data[data.length - 1]?.change ?? 0,
                      month: data[data.length - 1]?.month ?? '',
                      year: data[data.length - 1]?.year ?? '',
                    },
                    oneMonthAgo: {
                      change: data[data.length - 2]?.change ?? 0,
                      month: data[data.length - 2]?.month ?? '',
                      year: data[data.length - 2]?.year ?? 0,
                    },
                    twoMonthAgo: {
                      change: data[data.length - 3]?.change ?? 0,
                      month: data[data.length - 3]?.month ?? '',
                      year: data[data.length - 3]?.year ?? '',
                    },
                  };
                  console.log(stockData);

                  //Creo un copia della lista attuale
                  const currentStocks = this.stocksSubject.value;
                  console.log(currentStocks);

                  //Creo un boolean che verifica se un displaySymbol è già presente in lista
                  const isSymbolInStockList = (
                    symbol: string,
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

                  // Controllo se il ticker in input è valido o è già presente in lista
                  if (
                    !isSymbolPresent &&
                    stockData.displaySymbol !== undefined
                  ) {
                    currentStocks.push(stockData);
                  } else if (isSymbolPresent) {
                    alert('Ticker already present in the list.');
                  } else {
                    alert("Ticker in input doesn't exist. ");
                  }
                  return of(null);
                }),

                //Cattura eventuali errori
                catchError((error) => {
                  console.log('Error fetching insider sentiment:', error);
                  return of(null);
                })
              );
            }),
            catchError((error) => {
              console.log('Error fetching stock quote:', error);
              return of(null);
            })
          );
        }),
        catchError((error) => {
          console.log('Error fetching stock profile:', error);
          return of(null);
        }),

        //Aggiorno la lista con lo stockData aggiunto
        tap(() => {
          const currentStocks = this.stocksSubject.value;
          this.stocksSubject.next(currentStocks);
        })
      )
      .subscribe();
  }

  /*Elimina uno stock dalla lista in base
    confrontando il displaySymbol utilizzando come id univoco.
   */
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
