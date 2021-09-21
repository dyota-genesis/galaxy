// EXPRESS
const express   = require('express');
const app       = express();

// BODY-PARSER
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// MODULES
const {querydb}        = require('./util/functions.js')
const scores           = require('./routes/scores.js')
const scores_add       = require('./routes/scores_add.js')
const scores_patch     = require('./routes/scores_patch.js')
const scores_rolematch = require('./routes/scores_rolematch.js')

// PUBLIC
app.use(express.static('public'))

// SERVER
app.get('/all', (req, res) => {querydb(res, 'SELECT * FROM tblscores')})
app.get('/scores', (req, res) => {scores(req, res)})
app.post('/scores/add',(req, res) => {scores_add(req, res)})
app.post('/scores/rolematch',(req, res) => {scores_rolematch(req, res)})
app.post('/scores/patch',(req, res) => {scores_patch(req, res)})

// LISTEN
let localport = 8080

app.listen(
    process.env.PORT // for Heroku
    || localport, // for localhost
    () => console.log(`Listening on port ${localport}`)
);
