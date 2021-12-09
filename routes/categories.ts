import { querydb } from '../util/functions';

type Result = {
    level1_num: number;
    level2_num: number;
    cop_num   : number;
};

export async function categories(req, res): Promise<Result> {
    let sqlQuery: string = `SELECT DISTINCT level1_num, level2_num, cop_num FROM tblscores`;

    let output: Promise<Result> = querydb(res, sqlQuery);

    return output;
}
