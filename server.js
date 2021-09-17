// EXPRESS
const express   = require('express');
const app       = express();

// BODY-PARSER
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const {querydb,convertComparator,convertToSql} = require('./util/functions.js')

// PUBLIC
app.use(express.static('public'))

// SERVER
app.get('/all', (req, res) => {querydb(res, 'SELECT * FROM tblscores')})

app.get('/scores', (req, res) => {
    
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
})

app.post('/scores/add',(req, res) => {
    let body = req.body // body is an array of objects
    body.forEach((e,i)=>{
        console.log(`person_num is ${e.person_num}\nlevel2_num is ${e.level2_num}\nlevel1_num is ${e.level1_num}\ncop_num is ${e.cop_num}\nscore_num is ${e.score_num}`)
    })
    
    // let sqlQuery = `INSERT INTO tblscores (person_num, level2_num, level1_num, cop_num, score_num) VALUES`
    // querydb(res, sqlQuery)
})

// LISTEN
let localport = 8080

app.listen(
    process.env.PORT // for Heroku
    || localport, // for localhost
    () => console.log(`Listening on port ${localport}`)
);
