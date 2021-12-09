const { querydb, convertToSql } = require('../functions.js');
const localDatabase = require('../../local/database.js');

describe('querydb()', () => {
    it('connects to the database and returns some data', () => {
        let result = querydb('', 'SELECT * FROM tblscores;');

        let outcome = result.length > 0;

        expect(outcome).toBe(true);

    });
});