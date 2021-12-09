const { querydb } = require('../util/functions.js');

module.exports = async function scores_add(reqBody, res) {
    // body is an array of objects
    let body = reqBody;

    // set up array to collect () strings to put into VALUES in SQL query
    let values = [];

    // add each item in body into array. make sure the property order is the same as column order in SQL query
    body.forEach((e) => {
        values.push(
            `(${e.person_num},${e.level2_num},${e.level1_num},${e.cop_num},${e.score_num})`
        );
    });

    // textjoin values array
    let valuesString = values.join(',');

    // compose query INSERT INTO
    let sqlQuery = `INSERT INTO tblscores (person_num, level2_num, level1_num, cop_num, score_num)\nVALUES ${valuesString}`;

    console.log(sqlQuery);

    return await querydb(res, sqlQuery);
    // res.sendStatus(200);
}
