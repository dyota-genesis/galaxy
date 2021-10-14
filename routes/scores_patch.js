module.exports = scores_patch

const {querydb} = require('../util/functions.js')

// ASSUME THAT SCORES ARE THE ONLY THING THAT WILL BE UPDATED

async function scores_patch (reqBody, res) {
    // make sure that the data in Power Apps contains the record_id_num

    let score_num_clause    = ''
    let record_id_num_array = []

    // loop through req.body and construct individual clauses
    reqBody.forEach((e, i) => {
        // data columns
        score_num_clause    +=`WHEN ${e.record_id_num} THEN ${e.score_num} `
        
        // record_id_num
        record_id_num_array.push(e.record_id_num)
        record_id_num_clause = record_id_num_array.join(',')
    })


    // compose query UPDATE
    let sqlQuery = `UPDATE tblscores SET `
        + `score_num = (CASE record_id_num ${score_num_clause} END) `
        + `WHERE record_id_num IN(${record_id_num_clause});`
    
    console.log(sqlQuery)

    return await querydb(res, sqlQuery)
}
