const express = require('express');
const router = express.Router();
var db = require('./database');

router.get('/:year', function(req, res, next) {
    db.all(`SELECT substr(issue_d, 0, 4) as issue_d,
                   COUNT(id) as volume
             FROM loan
             WHERE issue_d LIKE ?
             GROUP BY issue_d`, ['%' + req.params.year], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.send(rows);
    });
});

module.exports = router;