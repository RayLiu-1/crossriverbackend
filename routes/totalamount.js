const express = require('express');
const router = express.Router();
var db = require('./database');

router.get('/:year', function(req, res, next) {
    db.get(`SELECT ROUND(SUM(loan_amnt)) as loan_amnt,
                    ROUND(SUM(funded_amnt_inv)) as funded_amnt_inv,
                    ROUND(SUM(funded_amnt)) as funded_amnt
             FROM loan
             WHERE issue_d LIKE ?`, ['%' + req.params.year], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.send(rows);
    });
});

module.exports = router;