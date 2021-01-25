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

  private bank$: Subscription;
  bank: IBank;
  bankOperations: ITransaction[];
  debtSum: number;
  credSum: number;
  totalSum: number;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.debtSum = this.credSum = this.totalSum = 0;
    this.bankOperations = [];
    this.bank$ = new Subscription();
    this.bank = {bank_account_number: '', bank_number: '', credited_operations: [], debited_operations: [], id: 0, name: ''};
  }

  ngOnInit(): void {
    let id = 0;
    this.route.params.subscribe(data => {
      id = data.id;
    });
    this.bank$ = this.apiService.getBankDetails(id).subscribe((data: IBank) => {
      this.bank = data;
      this.bankOperations = [...data.credited_operations, ...data.debited_operations];
      this.bankOperations.forEach( item => {
        this.totalSum += item.amount;
      });
      data.credited_operations.forEach( item => {
        this.credSum += item.amount;
      });
      data.debited_operations.forEach( item => {
        this.debtSum += item.amount;
      });
    });
  }

  ngOnDestroy(): void {
    this.bank$.unsubscribe();
  }
}
