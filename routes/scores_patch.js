module.exports = scores_patch

const {querydb,convertComparator,convertToSql} = require('../util/functions.js')

// ASSUME THAT SCORES ARE THE ONLY THING THAT WILL BE UPDATED

function scores_patch (req, res) {
    // make sure that the data in Power Apps contains the record_id_num

    // set up variables
    // let person_num_clause   = ''
    // let level2_num_clause   = ''
    // let level1_num_clause   = ''
    // let cop_num_clause      = ''
    let score_num_clause    = ''
    let record_id_num_array = []

    // loop through req.body and construct individual clauses
    req.body.forEach((e, i) => {
        // data columns
        // person_num_clause   +=`WHEN ${e.Value.record_id_num} THEN ${e.Value.person_num} `
        // level2_num_clause   +=`WHEN ${e.Value.record_id_num} THEN ${e.Value.level2_num} `
        // level1_num_clause   +=`WHEN ${e.Value.record_id_num} THEN ${e.Value.level1_num} `
        // cop_num_clause      +=`WHEN ${e.Value.record_id_num} THEN ${e.Value.cop_num} `
        score_num_clause    +=`WHEN ${e.Value.record_id_num} THEN ${e.Value.score_num} `
        
        // record_id_num
        record_id_num_array.push(e.Value.record_id_num)
        record_id_num_clause = record_id_num_array.join(',')
    })


    // compose query UPDATE
    let sqlQuery = `UPDATE tblscores SET `
                // + `person_num = (CASE record_id_num ${person_num_clause} END), `
                // + `level2_num = (CASE record_id_num ${level2_num_clause} END), `
                // + `level1_num = (CASE record_id_num ${level1_num_clause} END), `
                // + `cop_num = (CASE record_id_num ${cop_num_clause} END), `
                + `score_num = (CASE record_id_num ${score_num_clause} END) `
            + `WHERE record_id_num IN(${record_id_num_clause});`
    
    console.log(sqlQuery)

    querydb(res, sqlQuery)
}
