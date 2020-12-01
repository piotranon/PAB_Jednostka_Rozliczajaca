const request = require('supertest');
const app = require('../app');

describe('Test the banks API endpoint', () =>{
    test('It should response with GET', done => {
        request(app)
            .get('/api/v1/banks')
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    test('It should get array of banks', done => {
        request(app)
            .get('/api/v1/banks')
            .then(res => {
               expect(Array.isArray(res.body)).toBe(true);
               done();
            });
    });

    test('It should contain a bank object', done => {
        request(app)
            .get('/api/v1/banks')
            .then(res => {
                const toMatch = {
                    Bank_Number: expect.stringMatching(/[A-Z]{4}\s[A-Z]{4}/),
                    Total_Transfer_Amount: 0.00
                };
                expect(res.body[0]).toMatchObject(toMatch);
                done();
            });
    });
});
