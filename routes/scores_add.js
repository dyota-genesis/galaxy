module.exports = scores_add

const {querydb} = require('../util/functions.js')

async function scores_add (req, res) {
    // body is an array of objects
    let body = req.body 
        
    // set up array to collect () strings to put into VALUES in SQL query
    let values = []

    // add each item in body into array. note that the property is Value.x. make sure the property order is the same as column order in SQL query
    body.forEach((e,i)=>{
        values.push(
            `(${e.Value.person_num},${e.Value.level2_num},${e.Value.level1_num},${e.Value.cop_num},${e.Value.score_num})`
        )
    })

    // textjoin values array
    let valuesString = values.join(',')

    // compose query INSERT INTO
    let sqlQuery = `INSERT INTO tblscores (person_num, level2_num, level1_num, cop_num, score_num)\nVALUES ${valuesString}`

    console.log(sqlQuery)

    return await querydb(res, sqlQuery)
    // res.sendStatus(200);
}