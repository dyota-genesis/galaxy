'strictNullChecks'
export = scores_rolematch;

import {querydb} from '../util/functions'

interface Scores {
    person_num: number,
    cop_num: number,
    level2_num: number,
    level1_num: number,
    score_num: number
}

interface ReqBody {
    level1_num: number,
    score_num: number
}

async function scores_rolematch(reqBody: Array<ReqBody>, res):Promise<Scores> {
    
    console.log(reqBody)
    
    let sqlQuery:string
    let conditions:Array<string> = []
    
    // SELECT * FROM tblscores WHERE 
    // (level1_num = 6 AND score_num >= 3) OR (level1_num = 10 AND score_num >= 2)
    reqBody.forEach((e,i) => {
        console.log(e);
        conditions.push(
            `( level1_num = ${e.level1_num} AND score_num >= ${e.score_num} )`
        )
        
    })

    sqlQuery = `SELECT * FROM tblscores WHERE ${conditions.join(' OR ')}`

    console.log(sqlQuery)
    let output:Scores = await querydb(res, sqlQuery)
    console.log(output)
    return output
}
