"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.convertToSql = exports.querydb = void 0;
var mysql = require("mysql");
function querydb(res, query) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = mysql.createConnection(
                    // HIDE
                    // localDatabase
                    database);
                    conn.connect();
                    return [4 /*yield*/, queryPromise(conn, query)];
                case 1:
                    output = _a.sent();
                    conn.end();
                    return [2 /*return*/, output];
            }
        });
    });
}
exports.querydb = querydb;
function queryPromise(conn, query) {
    return new Promise(function (resolve, reject) {
        conn.query(query, function (err, rows, fields) {
            if (typeof rows !== 'undefined') {
                console.log("Returned " + rows.length + " rows");
            }
            return resolve(rows);
        });
    });
}
function convertToSql(responseQuery) {
    var keys = Object.keys(responseQuery); // array of keys
    var values = Object.values(responseQuery); // array of values
    var clauses = []; // empty array to hold all of the conditions
    // for each item in the query...
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = values[i];
        var splitValue = void 0;
        // separate out letters from numbers e.g. "gte9" => ['gte', '9']
        splitValue = value.match(/[a-zA-Z]+|[0-9]+/g);
        // if there is an operator, convert the operator
        var operator = void 0;
        var condition = void 0;
        if (splitValue.length > 1) {
            operator = convertComparator(splitValue[0]);
            condition = splitValue[1];
        }
        else {
            operator = '=';
            condition = splitValue[0];
        }
        clauses.push(key + " " + operator + " " + condition);
    }
    var conditions = clauses.join(' AND ');
    return conditions;
}
exports.convertToSql = convertToSql;
function convertComparator(comparator) {
    var operator;
    switch (comparator) {
        case 'gt':
            operator = '>';
            break;
        case 'lt':
            operator = '<';
            break;
        case 'gte':
            operator = '>=';
            break;
        case 'lte':
            operator = '>=';
            break;
    }
    return operator;
}
var database = {
    host: process.env.JAWSDB_HOST,
    user: process.env.JAWSDB_USER,
    password: process.env.JAWSDB_PASSWORD,
    database: process.env.JAWSDB_DATABASE
};
