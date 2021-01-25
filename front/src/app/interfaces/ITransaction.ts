export default interface ITransaction {
  id: number;
  status_id: number;
  title: string;
  updated_at: string;
  amount: number;
  created_at: string;
  credited_account_number: string;
  credited_bank_id: number;
  credited_name_and_address: string;
  debited_account_number: string;
  debited_bank_id: number;
  debited_name_and_address: string;
}
