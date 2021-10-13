module.exports = categories;

const {querydb} = require('../util/functions.js')

async function categories (req, res) {

    let sqlQuery = `SELECT DISTINCT level1_num, level2_num, cop_num FROM tblscores`
    
    console.log(sqlQuery)

    let output = querydb(res, sqlQuery)
    
    return output
}