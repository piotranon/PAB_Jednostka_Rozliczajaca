export default interface ITransaction {
  'id': number;
  'debited_bank_id': number;
  'credited_bank_id': number;
  'amount': number;
  'status_id': number;
  'status': {
    'id': number,
    'name': string
  };
}
