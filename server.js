const express   = require('express');
const app       = express();
const mysql     = require('mysql');

// SERVER

app.get('/all',       (req, res) => {querydb(res, 'SELECT * FROM tblPeopleSkillsScores')})

app.get('/', (req, res) => {
    query = req.query 
    
    // array of keys
    var keys = Object.keys(query)
    
    // array of values
    var values = Object.values(query)

    // empty array to setup for later
    clauses = []

    // for each item in the query...
        for (var i=0; i < keys.length; i++) {
        key = keys[i]
        value = values[i]
        
        // separate out letters from numbers 
        // e.g. "gte9" => ['gte', '9']
        splitValue = value.match(/[a-zA-Z]+|[0-9]+/g)
    
        // if there is an operator, convert the operator
        if(splitValue.length > 1) {
            operator = convertComparator(splitValue[0])
            condition = splitValue[1]
        } else {
            operator = '='
            condition = splitValue[0]
        }
        
        clauses.push(`${key} ${operator} ${condition}`)
    }

    conditions = clauses.join(" AND ")

    // if there are conditions, include WHERE keyword
    // TODO should move this up and skip the whole thing if no conditions

    keys.length > 0 ? keyword = 'WHERE' : keyword = ''
    
    sqlQuery = `SELECT * FROM tblPeopleSkillsScores ${keyword} ${conditions}`
    
    console.log(sqlQuery)

    querydb(res, sqlQuery)
})

// Heroku NEEDS the process.end.PORT part, not 3000
app.listen(
    process.env.PORT || 3000, 
    () => console.log('Listening on port 3000')
);

// FUNCTIONS

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

function convertComparator(comparator){
    switch(comparator){
        case 'gt':  operator = '>';  break;
        case 'lt':  operator = '<';  break;
        case 'gte': operator = '>='; break;
        case 'lte': operator = '>='; break;
    }
    return operator
}