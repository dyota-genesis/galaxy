const express = require('express');

const app = express();

const mysql = require('mysql');



app.get('/', (req,res) => {
    
    const conn = mysql.createConnection(
        {
            host: 'c8u4r7fp8i8qaniw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
            user: 'pmdpsktr9mw27q90',
            password: 'hl2dk6g11yemws9o',
            database: 'tbtl69l4kzu4zjdr'
        }
    )
    
    conn.connect();

    conn.query(
        'SELECT * FROM tblPeopleSkillsScores', 
        (err, rows, fields) => {
            res.json(rows);
        }
    );

    conn.end();
    
})

// Heroku NEEDS the process.end.PORT part, not 3000
app.listen(
    process.env.PORT || 3000, 
    () => console.log('Listening on port 3000')
);
