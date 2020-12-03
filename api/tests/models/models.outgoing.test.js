const request = require('supertest');
const app = require('../../app');
const {MongoClient} = require('mongodb');
describe('Test the outgoing models', () => {
    let connection;
    let db;
    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost/test', {
          useNewUrlParser: true,
        });
        db = await connection.db("test");
      });

    afterAll(async () => {
        await connection.close();
        await db.close();
      });

      test('should insert an outgoing transfer into Outgoing_Transfers collection', async () => {
        const outgoing = db.collection('Outgoing_Transfers');

       
        const mockOutgoing = {
            _id: 'some-outgoing-transfer-id',
            Bank_Info:  {
                Bank_Number: 'PL 5555 5555 0000 0000 0000 0000',
                Total_Transfer_Amount: 20.0,
                Last_Time_Request_Send: 2020-01-01
            },
            Outgoing_Transfers: {
                Transfers_Amount: 20.0,
                Transfers: [
                    {
                        Payer: {
                            Account_Number: 'PL 6666 6666 0000 0000 0000 0000',
                            Name: 'Adam Kowalski',
                            Address: 'Rzeszów ul. Przemysłowa 2',
                        },
                        Recipient: {
                            Account_Number: 'PL 7777 7777 0000 0000 0000 0000',
                            Name: 'Jan Nowak',
                            Address: 'Kraków ul. Podkarpacka 12',
                        },
                        Title: 'Transfer środków',
                        Transfer_Amount: 20.0
                    }
                ]
            },
            Outgoing_Incorrect_Transfers: {
                Transfers_Amount: 5.0,
                Transfers: [
                    {
                        Payer: {
                            Account_Number: 'PL 8888 8888 0000 0000 0000 0000',
                            Name: 'Piotr Nowak',
                            Address: 'Warszawa',
                        },
                        Recipient: {
                            Account_Number: 'PL 9999 9999 0000 0000 0000 0000',
                            Name: 'Jan Kowalski',
                            Address: 'Sopot',
                        },
                        Title: 'Przelewik',
                        Transfer_Amount: 5.0
                    }
                ]
            }
       
      
        }
          
        await outgoing.insertOne(mockOutgoing);

        const insertedTransfer = await Outgoing_Transfers.findOne({_id: 'some-outgoing-transfer-id'});
        expect(insertedTransfer).toEqual(mockOutgoing);
    });
    
    });