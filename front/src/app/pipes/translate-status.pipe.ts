import { Pipe, PipeTransform } from '@angular/core';

enum statusEnum {
  NULL,
  SENT,
  RECEIVED,
}

@Pipe({
  name: 'translateStatus'
})
export class TranslateStatusPipe implements PipeTransform {

  transform(value: number): string {
    if (value === statusEnum.SENT) { return 'Sent'; }
    if (value === statusEnum.RECEIVED) { return 'Received'; }
    return 'Błąd';
  }

}
