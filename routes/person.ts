import { querydb } from '../util/functions';
import { Scores } from '../util/types';

export async function person(req, res) {
    // e.g. (28, 29, 16)
    let sqlQuery: string = `SELECT * FROM tblscores WHERE person_num IN ${req.query.person_num};`;
    let output: Promise<Scores> = querydb(res, sqlQuery)
    return output;
}
