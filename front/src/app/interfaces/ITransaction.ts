export default interface ITransaction {
  'id': number;
  'type': number;
  'payer_account_number': string;
  'recipient_account_number': string;
  'amount': number;
  'created_at': string;
  'updated_at': string;
  'status_id': number;
  'account_id': number;
  'status': {
    'id': number;
    'name': string;
  };
  'account': {
    'id': number;
    'name': string;
    'bank_number': string;
  };
}
