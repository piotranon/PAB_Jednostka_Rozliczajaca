import { Component, OnInit } from '@angular/core';
import {faCoins} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  faCoins = faCoins;

  constructor() { }

  ngOnInit(): void {
  }

}
