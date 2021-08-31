const express = require('express');
const app = express();
const mysql = require('mysql');

const database = {
    host:     'c8u4r7fp8i8qaniw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user:     'pmdpsktr9mw27q90',
    password: 'hl2dk6g11yemws9o',
    database: 'tbtl69l4kzu4zjdr'
}

function querydb(res, query) {
        const conn = mysql.createConnection(database)
        conn.connect();
        conn.query(query, (err, rows, fields) => {
                res.json(rows);
        });
        conn.end();
}

app.get('/',       (req, res) => {querydb(res, 'SELECT * FROM tblPeopleSkillsScores')})
app.get('/limit5', (req, res) => {querydb(res, 'SELECT * FROM tblPeopleSkillsScores LIMIT 5')})

// Heroku NEEDS the process.end.PORT part, not 3000
app.listen(
    process.env.PORT || 3000, 
    () => console.log('Listening on port 3000')
);
