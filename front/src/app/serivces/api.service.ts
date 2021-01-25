import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import ITransaction from '../interfaces/ITransaction';
import IBank from '../interfaces/IBank';
import ICreateBank from '../interfaces/ICreateBank';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private PREFIX = 'http://localhost:8000/api';
  private PREFIX = 'http://91.189.216.237:8000/api';
  private BANKS = '/banks';
  private OPERATIONS = '/operations';
  private SESSION = '/session';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllBanks(): Observable<IBank[]> {
    return this.httpClient
      .get(this.PREFIX + this.BANKS) as Observable<IBank[]>;
  }

  getBankDetails(id: number): Observable<any> {
    return this.httpClient
      .get(this.PREFIX + this.BANKS + `/${id}`);
  }

  getAllTransactions(): Observable<ITransaction[]> {
    return this.httpClient
      .get(this.PREFIX + this.OPERATIONS) as Observable<ITransaction[]>;
  }

  getBankTransactions(id: number): Observable<ITransaction[]> {
    return this.httpClient
      .get(this.PREFIX + this.OPERATIONS + `/${id}`) as Observable<ITransaction[]>;
  }

  postNewBank(createObject: ICreateBank): Observable<any> {
    return this.httpClient
      .post(this.PREFIX + this.BANKS, createObject) as Observable<any>;
  }

  getTransactionsDetails(id: number): Observable<ITransaction> {
    return this.httpClient
      .get(this.PREFIX + this.OPERATIONS + `/${id}`) as Observable<ITransaction>;
  }
}
