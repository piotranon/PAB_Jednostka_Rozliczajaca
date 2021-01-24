import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../serivces/api.service';
import IBank from '../../interfaces/IBank';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import ITransaction from '../../interfaces/ITransaction';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit, OnDestroy {

  subs$: Subscription;
  bank: IBank;
  bankOperations: ITransaction[];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.bankOperations = [];
    this.subs$ = new Subscription();
    this.bank = {bank_account_number: '', bank_number: '', id: 0, name: ''};
  }

  ngOnInit(): void {
    let id = 0;
    this.route.params.subscribe(data => {
      id = data.id;
    });
    this.subs$.add(this.apiService.getBankDetails(id).subscribe(data => {
      this.bank = data;
    }));
    this.subs$.add(this.apiService.getBankTransactions( this.bank.id).subscribe(data => {
      this.bankOperations = data;
    }));
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  translateTypeToString( type: number ): string {
    if (type === 1 ) {
      return '-';
    }
    if (type === 2 ) {
      return '+';
    }
    return '';
  }
}
