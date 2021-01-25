import { Pipe, PipeTransform } from '@angular/core';
import IBank from '../interfaces/IBank';

@Pipe({
  name: 'searchBanks'
})
export class SearchBanksPipe implements PipeTransform {

  transform(items: IBank[], search: string): IBank[] {
    if (!items) { return []; }

    if (!search) { return items; }

    search = search.toLowerCase();

    return items.filter( bank => {
      if (
        bank.bank_number.toLowerCase().includes(search) ||
        bank.bank_account_number.toLowerCase().includes(search)
      ) {
        return bank;
      }

      if ( bank.name !== null && bank.name.toLowerCase().includes(search) ){
        return bank;
      }
      return null;
    });
  }

}
