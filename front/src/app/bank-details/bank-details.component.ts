import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../serivces/api.service';
import IBank from '../interfaces/IBank';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit, OnDestroy {

  bank$: Subscription;
  bank: IBank;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.bank$ = new Subscription();
    this.bank = {
      account_all: {
        account_number: '',
        bank_id: 0,
        id: 0,
        operations_all: [
          {
            account_id: 0,
            amount: 0,
            created_at: '',
            id: 0,
            payer_account_number: '',
            recipient_account_number: '',
            status: {id: 0, name: ''},
            status_id: 0,
            type: 0,
            updated_at: ''
          }
        ]
      },
      bank_number: '',
      id: 0,
      name: '',
    };
  }

  ngOnInit(): void {
    let id = 0;
    this.route.params.subscribe(data => {
      id = data.id;
    });
    this.bank$ = this.apiService.getBankDetails(id).subscribe(data => {
      this.bank = data;
    });
  }

  ngOnDestroy(): void {
    this.bank$.unsubscribe();
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
