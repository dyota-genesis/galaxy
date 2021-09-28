module.exports = scores_rolematch

const {querydb} = require('../util/functions.js')


async function scores_rolematch (req, res) {

    let conditions = ``

    req.body.forEach((e, i)=>{
        conditions += `WHEN level1_num = ${e.level1_num} THEN level2_num = ${e.level2_num} `
    })
    
    let sqlQuery = 
        `SELECT * FROM tblscores `
        + `WHERE `
        + `(CASE ${conditions} END);`
    
    console.log(sqlQuery)

    // REPLACE DUMMY
    // rows = await querydb(res, sqlQuery)
    rows = sampleResBody
    
    /* 
        prepare object to be received at Power Apps
        header is an array of all the person_num in the set
        data is an array of arrays. outer array is "skillsets of people". inner array is "skill and scores"
    */
    let output = {
        header: [],
        data: []
    }

    let grouped = rows.reduce(
        (accum, current)=>{
            let person_num_key = current.person_num
            
            if(!accum.hasOwnProperty(person_num_key)){
                accum[person_num_key] = []
            }

            let thisPerson = rows
                .filter((e)=>{
                    return e.person_num === person_num_key
                })
                .reduce((accum, current)=>{
                    accum.push(
                        {
                            level1_num: current.level1_num,
                            level2_num: current.level2_num,
                            score_num: current.score_num
                        }
                    )
                    return accum
                },[])
            
            accum[person_num_key] = thisPerson

            return accum
        },
        {}
    )

    // need to group by person_num before doing this!!
    for (const key in grouped) {
        if(grouped.hasOwnProperty(key)) {
            output.header.push(key)
            output.data.push(grouped[key])      
        }
    }
    
    
    /*
    grouped.forEach((e,i)=>{
        
        // build up a unique array of person_num
        if (output.header.indexOf(e.person_num) === -1) {
            output.header.push(e.person_num)
        }

        output.data.push(
            {
                level2_num: e.level2_num,
                level1_num: e.level1_num,
                score_num: e.score_num,
                desired_score_num: 1
            }
        )

    })
    */
    
    return output
}

let sampleReqBody = {
    body: [
        {Value: {level1_num: 12, level2_num: 5}},
        {Value: {level1_num: 48, level2_num: 19}}
    ]
}

let sampleResBody = [
    {
        person_num: 28,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 138
    },
    {
        person_num: 40,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 142
    },
    {
        person_num: 42,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 146
    },
    {
        person_num: 27,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 150
    },
    {
        person_num: 29,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 154
    },
    {
        person_num: 188,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 158
    },
    {
        person_num: 31,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 162
    },
    {
        person_num: 28,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 166
    },
    {
        person_num: 40,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 170
    },
    {
        person_num: 42,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 1,
        record_id_num: 174
    },
    {
        person_num: 27,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 1,
        record_id_num: 178
    },
    {
        person_num: 29,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 182
    },
    {
        person_num: 188,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 186
    },
    {
        person_num: 28,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 190
    },
    {
        person_num: 40,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 194
    },
    {
        person_num: 42,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 198
    },
    {
        person_num: 27,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 202
    },
    {
        person_num: 29,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 206
    },
    {
        person_num: 188,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 210
    },
    {
        person_num: 31,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 214
    },
    {
        person_num: 31,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 218
    },
    {
        person_num: 16,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 222
    },
    {
        person_num: 16,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 226
    },
    {
        person_num: 16,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 230
    },
    {
        person_num: 37,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 234
    },
    {
        person_num: 37,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 238
    },
    {
        person_num: 32,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 242
    },
    {
        person_num: 32,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 1,
        record_id_num: 246
    },
    {
        person_num: 32,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 250
    },
    {
        person_num: 36,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 254
    },
    {
        person_num: 36,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 258
    },
    {
        person_num: 36,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 262
    },
    {
        person_num: 38,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 266
    },
    {
        person_num: 38,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 270
    },
    {
        person_num: 38,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 274
    },
    {
        person_num: 33,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 278
    },
    {
        person_num: 33,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 282
    },
    {
        person_num: 33,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 286
    },
    {
        person_num: 41,
        level2_num: 5,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 290
    },
    {
        person_num: 41,
        level2_num: 21,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 294
    },
    {
        person_num: 41,
        level2_num: 13,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 298
    },
    {
        person_num: 28,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 302
    },
    {
        person_num: 40,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 306
    },
    {
        person_num: 41,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 310
    },
    {
        person_num: 42,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 314
    },
    {
        person_num: 27,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 318
    },
    {
        person_num: 29,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 322
    },
    {
        person_num: 188,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 326
    },
    {
        person_num: 31,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 330
    },
    {
        person_num: 16,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 334
    },
    {
        person_num: 37,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 338
    },
    {
        person_num: 36,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 342
    },
    {
        person_num: 38,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 346
    },
    {
        person_num: 33,
        level2_num: 12,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 350
    },
    {
        person_num: 28,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 354
    },
    {
        person_num: 40,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 358
    },
    {
        person_num: 42,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 362
    },
    {
        person_num: 27,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 366
    },
    {
        person_num: 29,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 370
    },
    {
        person_num: 188,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 374
    },
    {
        person_num: 31,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 378
    },
    {
        person_num: 16,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 382
    },
    {
        person_num: 37,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 386
    },
    {
        person_num: 32,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 2,
        record_id_num: 390
    },
    {
        person_num: 36,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 4,
        record_id_num: 394
    },
    {
        person_num: 38,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 1,
        record_id_num: 398
    },
    {
        person_num: 33,
        level2_num: 11,
        level1_num: 12,
        cop_num: 9,
        score_num: 3,
        record_id_num: 402
    }
]

scores_rolematch(sampleReqBody);