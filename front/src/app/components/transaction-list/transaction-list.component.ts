import {Component, OnDestroy, OnInit} from '@angular/core';
import {faListOl} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import ITransaction from '../../interfaces/ITransaction';
import {ApiService} from '../../serivces/api.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {
  faListOl = faListOl;

  private transactions$: Subscription;
  transactions: ITransaction[];
  sumAmountsOutgoing: number;
  sumAmountsIncoming: number;
  sumAmounts: number;
  sumTransactionOutgoing: any[];
  sumTransactionIncoming: any[];
  sumTransaction: number;
  search: string;

  constructor(
    private apiService: ApiService,
  ) {
    this.search = '';
    this.sumAmounts = this.sumAmountsIncoming = this.sumAmountsOutgoing = 0;
    this.sumTransaction = 0;
    this.sumTransactionIncoming = this.sumTransactionOutgoing = [];
    this.transactions$ = new Subscription();
    this.transactions = [];
  }

  ngOnInit(): void {
    this.transactions$ = this.apiService.getAllTransactions().subscribe( (data: any[]) => {
      console.log(data);
      this.transactions = data;
      this.sumTransaction = data.length;
      this.sumTransactionOutgoing = this.transactions.filter( transaction => transaction.status_id === 2);
      this.sumTransactionIncoming = this.transactions.filter( transaction => transaction.status_id === 1);
      this.transactions.forEach( transaction => {
        this.sumAmounts += transaction.amount;
      });
      this.sumTransactionIncoming.forEach( transaction => {
        this.sumAmountsIncoming += transaction.amount;
      });
      this.sumTransactionOutgoing.forEach( transaction => {
        this.sumAmountsOutgoing += transaction.amount;
      });
    });
  }

  ngOnDestroy(): void {
    this.transactions$.unsubscribe();
  }

}
