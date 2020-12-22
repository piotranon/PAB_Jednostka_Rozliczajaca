import {Component, OnDestroy, OnInit} from '@angular/core';
import {faListUl} from '@fortawesome/free-solid-svg-icons';
import {ApiService} from '../serivces/api.service';
import IBank from '../interfaces/IBank';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
  styleUrls: ['./banks-list.component.scss']
})
export class BanksListComponent implements OnInit, OnDestroy {
  faListUl = faListUl;

  private banks$: Subscription;
  banks: Array<IBank>;

  constructor(
    private apiService: ApiService
  ) {
    this.banks$ = new Subscription();
    this.banks = [];
  }

  ngOnInit(): void {
    this.banks$ = this.apiService.getAllBanks().subscribe( (data: Array<IBank>) => {
      this.banks = data;
    });
  }

  ngOnDestroy(): void {
    this.banks$.unsubscribe();
  }

}
