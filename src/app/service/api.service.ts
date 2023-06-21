import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://finnhub.io/api/v1';
  private token = 'bu4f8kn48v6uehqi3cqg';

  private stockListSubject = new BehaviorSubject<any[]>([]);
  public stockList$ = this.stockListSubject.asObservable();

  constructor(private http: HttpClient) {}
  search(query: string): Observable<any> {
    const url = `${this.apiUrl}/search?q=${query}&token=${this.token}`;
    return this.http.get(url).subscribe(
      
    );
  }
}
