const mySQL = require('mysql');

const MySQLConnector = class {
    static #connection = null;
    static async init({
        host,
        user,
        password,
        database
    }) {
        return new Promise((resolve, reject) => {
            if (MySQLConnector.#connection) {
                resolve('Connection pool already exists.');
            }
            const connectionPool = mySQL.createPool({
                host,
                user,
                password,
                database,
                multipleStatements: true
            });

            /* test the connection */
            connectionPool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                else {
                    connection.release();

                    MySQLConnector.#connection = connectionPool;

                    resolve('Connection pool established.');
                }
            });
        });
    }
    static async runQuery(sql, ...args) {
        return new Promise((resolve, reject) => {
            if (!MySQLConnector.#connection) {
                reject('Can\'t run query. Initialize connection first.');
            }
            const escapedQuery = mySQL.format(sql, args);
            MySQLConnector.#connection.query(escapedQuery, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }
    constructor({
        host,
        user,
        password,
        database
    }) {
        MySQLConnector.init({ host, user, password, database });
    }
};

module.exports = MySQLConnector;