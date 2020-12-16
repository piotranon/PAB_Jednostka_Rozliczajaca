import { Component, OnInit } from '@angular/core';
import {faListOl} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  faListOl = faListOl;
  
  constructor() { }

  ngOnInit(): void {
  }

}
