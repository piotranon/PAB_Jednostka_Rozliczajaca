var express = require('express');
var router = express.Router();

/* GET all banks */
router.get('/banks', (req, res) => {
    const response = [
        {
            Bank_Number: 'AAAA AAAA',
            Total_Transfer_Amount: 0.00,
        },
        {
            Bank_Number: 'BBBB BBBB',
            Total_Transfer_Amount: 10.00,
        }
    ];
    res.status(200).json(response);
});

/* POST new bank */
router.post('/banks', (req, res) => {
    console.log(req);
    res.status(200).send('Done');
});

module.exports = router;
