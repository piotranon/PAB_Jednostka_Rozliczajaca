import {Component, OnDestroy, OnInit} from '@angular/core';
import {faListOl} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import ITransaction from '../interfaces/ITransaction';
import {ApiService} from '../serivces/api.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {
  faListOl = faListOl;

  private transactions$: Subscription;
  transactions: Array<ITransaction>;

  constructor(
    private apiService: ApiService,
  ) {
    this.transactions$ = new Subscription();
    this.transactions = [];
  }

  ngOnInit(): void {
    this.transactions$ = this.apiService.getAllTransactions().subscribe( data => {
      this.transactions = data;
    });
  }

  ngOnDestroy(): void {
    this.transactions$.unsubscribe();
  }

}
