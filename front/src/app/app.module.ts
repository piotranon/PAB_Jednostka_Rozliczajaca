import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BanksListComponent } from './components/banks-list/banks-list.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AddBankComponent } from './components/add-bank/add-bank.component';
import { SearchTransactionPipe } from './pipes/search-transaction.pipe';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBanksPipe } from './pipes/search-banks.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TranslateStatusPipe } from './pipes/translate-status.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BanksListComponent,
    BankDetailsComponent,
    TransactionListComponent,
    TransactionDetailsComponent,
    TopBarComponent,
    AddBankComponent,
    SearchTransactionPipe,
    SearchBanksPipe,
    TranslateStatusPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
