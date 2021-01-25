import {Component, OnInit} from '@angular/core';
import {faUniversity} from '@fortawesome/free-solid-svg-icons';
import {ApiService} from '../../serivces/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {
  faUniversity = faUniversity;
  bankName: string;
  bankNumber: string;

  constructor(private api: ApiService, private snackBar: MatSnackBar) {
    this.bankName = this.bankNumber = '';
  }

  ngOnInit(): void {
  }

  addBank(): void {
    this.api.postNewBank({BankNo: this.bankNumber, name: this.bankName}).pipe(
      // @ts-ignore
      catchError(() => {
        this.snackBar.open('Bład', 'OK', {
          duration: 3000
        });
      }),
    ).subscribe(data => {
      if (data.created) {
        this.snackBar.open('Utworzono bank', 'OK', {
          duration: 3000
        });
      }
    });
  }
}
