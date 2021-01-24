import { Component, OnInit } from '@angular/core';
import {faUniversity} from '@fortawesome/free-solid-svg-icons';
import {ApiService} from '../../serivces/api.service';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {
  faUniversity = faUniversity;
  bankName: string;
  bankNumber: string;
  constructor( private api: ApiService ) {
    this.bankName = this.bankNumber = '';
  }

  ngOnInit(): void {
  }

  addBank(): void {
    this.api.postNewBank({BankNo: this.bankNumber, name: this.bankName}).subscribe(data => {
      if (data.created) {
        alert('Utworzono bank');
      }
      else {
        alert('Błąd');
      }
    });
  }
}
