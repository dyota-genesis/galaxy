// EXPRESS
const express = require('express');
const app = express();

// BODY-PARSER
const bp = require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// MODULES
const { querydb } = require('./util/functions.js');
const scores = require('./routes/scores.js');
const scores_add = require('./routes/scores_add.js');
const scores_patch = require('./routes/scores_patch.js');
const scores_rolematch = require('./routes/scores_rolematch.js');
const categories = require('./routes/categories.js');
const { person } = require('./routes/person.js');
const delete_scores = require('./routes/delete_scores.js');

// PUBLIC
app.use(express.static('public'));

// SERVER
//  GET
// Retrieve all records
app.get('/all', async (req, res) => { res.json(await querydb(res, 'SELECT * FROM tblscores')); });
// Retrieve records, given conditions in URL query parameters (e.g. ...?person_num=2&cop_num=9&level2_num=100)
app.get('/scores', async (req, res) => { res.json(await scores(req, res)); });
// SELECT DISTINCT level1_num, level2_num, cop_num FROM tblscores
app.get('/categories', async (req, res) => { res.json(await categories(req, res)); });
// Retrieves records given a series of person_num (e.g. ...?person_num=(27,28,29)) 
app.get('/person', async (req, res) => { res.json(await person(req, res)); });

//  POST
// Insert new rows into tblScores from an array of input objects: Scores
app.post('/scores/add', async (req, res) => { res.json(await scores_add(req.body, res)); });
// For a given set of records, update the score values for them.
app.post('/scores/patch', async (req, res) => { res.json(await scores_patch(req.body, res)); });
app.post('/scores/rolematch', async (req, res) => { res.json(await scores_rolematch(req.body, res)); });

// DELETE
// Deleted whole level2 or level1 skill. Expects parameters e.g. /delete?level2=189; /delete?level1=112
app.post('/delete', async (req, res) => { res.json(await delete_scores(req, res)); });

// LISTEN
let localport = 8080;

app.listen(
    process.env.PORT // for Heroku
    || localport, // for localhost
    () => console.log(`Listening on port ${localport}`)
);