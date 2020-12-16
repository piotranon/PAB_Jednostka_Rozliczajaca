import { Component, OnInit } from '@angular/core';
import {faListUl} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
  styleUrls: ['./banks-list.component.scss']
})
export class BanksListComponent implements OnInit {
  faListUl = faListUl;
  
  constructor() { }

  ngOnInit(): void {
  }

}
