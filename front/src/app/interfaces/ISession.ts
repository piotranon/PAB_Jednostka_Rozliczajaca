export default interface ISession {
  'Bank_Info': {
    'Bank_Number': string;
    'Total_Transfer_Amount': number;
  };
  'Outgoing_Transfers': {
    'Transfers_Amount': number;
    'Transfers': [
      {
        'Payer': {
          'Account_Number': string;
          'Name': string;
          'Address': string;
        },
        'Recipient': {
          'Account_Number': string;
          'Name': string;
          'Address': string;
        },
        'Title': string;
        'Transfer_Amount': number;
      }
    ]
  };
  'Outgoing_Incorrect_Transfers': {
    'Transfers_Amount': number;
    'Transfers': []
  };
}
