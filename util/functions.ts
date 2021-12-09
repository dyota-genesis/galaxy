import * as mysql from 'mysql';
// HIDE
import { localDatabase } from '../local/database';

export async function querydb(res, query:string) {
    const conn = mysql.createConnection(
        // HIDE
        // localDatabase
        database
    );

    conn.connect();
    let output;
    output = await queryPromise(conn, query);
    conn.end();
    return output;
}

function queryPromise(conn, query) {
    return new Promise((resolve, reject) => {
        conn.query(query, (err, rows, fields) => {
            if (typeof rows !== 'undefined') {
                console.log(`Returned ${rows.length} rows`);
            }
            return resolve(rows);
        });
    });
}

export function convertToSql(responseQuery): string {
    let keys: Array<string> = Object.keys(responseQuery); // array of keys
    let values: Array<string> = Object.values(responseQuery); // array of values
    let clauses = []; // empty array to hold all of the conditions

    // for each item in the query...
    for (var i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value: string = values[i];
        let splitValue: Array<string>;

        // separate out letters from numbers e.g. "gte9" => ['gte', '9']
        splitValue = value.match(/[a-zA-Z]+|[0-9]+/g);

        // if there is an operator, convert the operator
        let operator: string;
        let condition: string;
        if (splitValue.length > 1) {
            operator = convertComparator(splitValue[0]);
            condition = splitValue[1];
        } else {
            operator = '=';
            condition = splitValue[0];
        }

        clauses.push(`${key} ${operator} ${condition}`);
    }

    let conditions: string = clauses.join(' AND ');

    return conditions;
}

function convertComparator(comparator) {
    let operator: string;
    switch (comparator) {
        case 'gt': operator = '>'; break;
        case 'lt': operator = '<'; break;
        case 'gte': operator = '>='; break;
        case 'lte': operator = '>='; break;
    }
    return operator;
}

const database = {
    host: process.env.JAWSDB_HOST,
    user: process.env.JAWSDB_USER,
    password: process.env.JAWSDB_PASSWORD,
    database: process.env.JAWSDB_DATABASE,
};
