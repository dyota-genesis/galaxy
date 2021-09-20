module.exports = scores

const {querydb,convertComparator,convertToSql} = require('../util/functions.js')

function scores(req, res) {
    // default: no conditions
    let conditions = ''
    let keyword = ''

    // if there are query parameters, then convert it to a SQL query
    if (Object.keys(req.query).length > 0) {
        keyword = 'WHERE'
        conditions = convertToSql(req.query)
    } 
    let sqlQuery = `SELECT * FROM tblscores ${keyword} ${conditions}`

    console.log(sqlQuery)

    querydb(res, sqlQuery)
}
