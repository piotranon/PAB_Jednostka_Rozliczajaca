import ITransaction from './ITransaction';

export default interface IBank {
  id: number;
  name: string;
  bank_account_number: string;
  bank_number: string;
  credited_operations: ITransaction[];
  debited_operations: ITransaction[];
}
