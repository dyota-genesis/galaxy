module.exports = {querydb,convertToSql}

const mysql = require('mysql');
// HIDE
const localDatabase = require('../local/database.js');

async function querydb(res, query) {
    const conn = mysql.createConnection(
        // HIDE
        localDatabase
        // database
    )
    
    let output = []
    conn.connect();
    output = await queryPromise(conn, query)
    conn.end();
    return output
}

function queryPromise(conn, query) {
    return new Promise((resolve, reject)=> {
        conn.query(query, (err, rows, fields) => {
                console.log(`Returned ${rows.length} rows`)
                return resolve(rows)
            })
    });
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

function convertToSql(responseQuery) {
    let keys = Object.keys(responseQuery) // array of keys
    let values = Object.values(responseQuery) // array of values
    let clauses = [] // empty array to hold all of the conditions

    // for each item in the query...
    for (var i=0; i < keys.length; i++) {
        let key = keys[i]; let value = values[i];
        
        // separate out letters from numbers e.g. "gte9" => ['gte', '9']
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

    return conditions

}

const database = {
    host:     process.env.JAWSDB_HOST,
    user:     process.env.JAWSDB_USER,
    password: process.env.JAWSDB_PASSWORD,
    database: process.env.JAWSDB_DATABASE 
}
