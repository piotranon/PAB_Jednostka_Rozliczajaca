import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../serivces/api.service';
import {ActivatedRoute} from '@angular/router';
import ITransaction from '../../interfaces/ITransaction';
import IBank from '../../interfaces/IBank';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  public transaction: ITransaction;
  creditedBank: IBank;
  debitedBank: IBank;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) {
    this.creditedBank = this.debitedBank = {
      bank_account_number: '',
      bank_number: '',
      credited_operations: [],
      debited_operations: [],
      id: 0,
      name: ''
    };
    this.transaction = {
      amount: 0,
      created_at: '',
      credited_account_number: '',
      credited_bank_id: 0,
      credited_name_and_address: '',
      debited_account_number: '',
      debited_bank_id: 0,
      debited_name_and_address: '',
      id: 0,
      status_id: 0,
      title: '',
      updated_at: ''
    };
    this.route.params.subscribe(params => {
      this.api.getTransactionsDetails(params.id).subscribe(data => {
        this.transaction = data;
        this.api.getBankDetails(data.credited_bank_id).subscribe( credBank => {
          this.creditedBank = credBank;
        });
        this.api.getBankDetails(data.debited_bank_id).subscribe(debtBank => {
          this.debitedBank = debtBank;
        });
      });
    });
  }

  ngOnInit(): void {
  }

}
