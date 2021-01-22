import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BanksListComponent } from './banks-list/banks-list.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { AddBankComponent } from './add-bank/add-bank.component';

const routes: Routes = [
  { path: '', component: TransactionListComponent },
  { path: 'bank-details/:id', component: BankDetailsComponent },
  { path: 'banks-list', component: BanksListComponent },
  { path: 'transaction-details/:id', component: TransactionDetailsComponent },
  { path: 'add-bank', component: AddBankComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
