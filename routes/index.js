var express = require('express');
var router = express.Router();

const url = 'http://192.168.1.17/'

/* GET home page. */
router.get('/', function(req, res, next) {
    const apis = {
        'total_amounts_url': url + 'totalamount/{year}',
        'loans_by_credit_grade': url + 'loansbycreditgrade/{year}',
        'monthly_loan_volume': url + 'monthlyloanvolume/{year}'
    };
    res.send(apis);
});

module.exports = router;
