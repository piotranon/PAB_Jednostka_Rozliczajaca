import { Component, OnInit } from '@angular/core';
import {faUniversity} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {
  faUniversity = faUniversity;
  constructor() { }

  ngOnInit(): void {
  }

}
