module.exports = scores_rolematch

const {querydb,convertComparator,convertToSql} = require('../util/functions.js')


function scores_rolematch (req, res) {

    let conditions = ``

    req.body.forEach((e, i)=>{
        conditions += `WHEN level1_num = ${e.Value.level1_num} THEN level2_num = ${e.Value.level2_num} `
    })

    
    let sqlQuery = 
        `SELECT * FROM tblscores `
        + `WHERE `
        + `(CASE ${conditions} END);`
    
    console.log(sqlQuery)

    // querydb(res, sqlQuery)
}

let sampleBody = {
    body: [
        {Value: {level1_num: 12, level2_num: 5}},
        {Value: {level1_num: 48, level2_num: 19}}
    ]
}


scores_rolematch(sampleBody);