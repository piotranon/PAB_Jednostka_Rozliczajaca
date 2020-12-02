const request = require('supertest');
const app = require('../app');

describe('Test the outgoing endpoint', () => {
    test('It should response with GET', done => {
        const bankNum = 'AAAA AAAA';
        request(app)
            .get('/api/v1/transfers/incoming/')
            .query({bank: bankNum})
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    test("It shouldn't respond with string", done => {
        const bankNum = 'AAAA AAAA';
        request(app)
            .get('/api/v1/transfers/incoming/')
            .query({bank: bankNum})
            .then(res => {
                expect(typeof res.body).not.toBe("string");
                done();
            });
    });

    test("It should respond with object", done => {
        const bankNum = 'AAAA AAAA';
        request(app)
            .get('/api/v1/transfers/incoming/')
            .query({bank: bankNum})
            .then(res => {
                expect(typeof res.body).toBe("object");
                done();
            });
    });

    test("It should respond with object with keys: 'Bank_Info', 'Outgoing_Transfers', 'Outgoing_Incorrect_Transfers' ", done => {
        const bankNum = 'AAAA AAAA';
        request(app)
            .get('/api/v1/transfers/incoming/')
            .query({bank: bankNum})
            .then(res => {
                expect(Object.keys(res.body)).toStrictEqual(['Total_Transfer_Amount', 'Incoming_Transfers', 'Incoming_Incorrect_Transfers']);
                done();
            });
    });
});

