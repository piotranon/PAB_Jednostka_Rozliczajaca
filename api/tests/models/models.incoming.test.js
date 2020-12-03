const request = require('supertest');
const app = require('../../app');
const {MongoClient} = require('mongodb');
describe('Test the incoming models', () => {
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
      
      test('should insert an incoming transfer into Incoming_Transfers collection', async () => {
        const incoming = db.collection('Incoming_Transfers');

        const mockIncoming = {
          _id: 'some-incoming-transfer-id',
          Total_Transfer_Amount: 10.0,
          Incoming_Transfers: {
            Transfers_Amount: 10.0,
            Transfers: [
              {
                Payer: {
                  Account_Number: 'PL 1234 1234 0000 0000 0000 0000',
                  Name: 'Jan Kowalski',
                  Address: 'Warszawa'
                },
                Recipient: {
                  Account_Number: 'PL 2222 2222 0000 0000 0000 0000',
                  Name: 'Piotr Nowak',
                  Address: 'Sopot ul. Fajna 15'
                },
                Title: 'Przelew',
                Transfer_Amount: 10.0
              }
            ]
          },
          Incoming_Incorrect_Transfer: {
            Transfers_Amount: 5.0,
            Transfers: [
                {
                    Payer: {
                        Account_Number: 'PL 3333 3333 0000 0000 0000 0000',
                        Name: 'Adam',
                        Address: 'Gdynia ul. X 15'
                    },
                    Recipient: {
                        Account_Number: 'PL 4444 4444 0000 0000 0000 0000',
                        Name: 'Mateusz',
                        Address: 'Rzeszów ul. Z 20'
                    },
                    Title: 'Płatność za rower',
                    Transfer_Amount: 5.0
                }
            ]
        }
        
      }
    
        await incoming.insertOne(mockIncoming);

        const insertedTransfer = await Incoming_Transfers.findOne({_id: 'some-incoming-transfer-id'});
        expect(insertedTransfer).toEqual(mockIncoming);
    });
    
    });
// Czy jest połączenie do mongo
// Czy model jest utworzony z dobrymi kluczami
// Czy model jest utworzony z dobrymi wartościami kluczy