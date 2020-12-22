import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private PREFIX = 'http://localhost:8000/api';
  private BANKS = '/banks';
  private OPERATIONS = '/operations';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllBanks(): Observable<any> {
    return this.httpClient
      .get(this.PREFIX + this.BANKS);
  }

  getBankDetails(id: number): Observable<any> {
    return this.httpClient
      .get(this.PREFIX + this.BANKS + `/${id}`);
  }

  getAllTransactions(): Observable<any> {
    return this.httpClient
      .get(this.PREFIX + this.OPERATIONS);
  }
}
