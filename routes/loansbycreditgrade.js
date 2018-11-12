const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var db = require('./database');

router.get('/:year', function(req, res, next) {
    db.all(`SELECT grade as grade,
                   issue_d as issue_d,
                   AVG(funded_amnt) as funded_amnt
             FROM loan
             WHERE issue_d LIKE ?
             GROUP BY grade, issue_d
             ORDER BY grade`, ['%' + req.params.year], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        console.log(rows);
        const result = {};
        rows.forEach(row => {
            result[row.grade] = result[row.grade] || {};
            result[row.grade][row.issue_d.substr(0, 3)] = row.funded_amnt;
        });
        res.send(Object.keys(result).map((grade) => {
            return {
                grade: grade,
                amnt: result[grade]
            };
        }));
    });
});

module.exports = router;