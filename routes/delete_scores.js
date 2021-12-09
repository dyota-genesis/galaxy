const { querydb } = require('../util/functions.js');

module.exports = delete_scores = async (req, res) => {
    let field = Object.keys(req.query)[0]
    let value = Object.values(req.query)[0]

    let sqlQuery = `DELETE FROM tblscores WHERE ${field} = ${value}`
    
    console.log(sqlQuery);
    return await querydb(res, sqlQuery);
}