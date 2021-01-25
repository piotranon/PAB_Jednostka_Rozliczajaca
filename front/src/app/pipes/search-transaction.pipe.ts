import { Pipe, PipeTransform } from '@angular/core';
import ITransaction from '../interfaces/ITransaction';

@Pipe({
  name: 'searchTransaction'
})
export class SearchTransactionPipe implements PipeTransform {

  transform(items: ITransaction[], search: string): ITransaction[] {
    if (!items) { return []; }

    if (!search) { return items; }

    search = search.toLowerCase();

    return items.filter( transaction => {
      if (transaction.amount.toString().includes(search) || transaction.status.name.includes(search)) {
        return transaction;
      }
      return null;
    });
  }

}
