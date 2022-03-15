const { INTERNAL_SERVER_ERROR } = require('http-status-codes').StatusCodes;

const ResponseError = class extends Error {
    constructor({
        message = '',
        reason = '',
        statusCode = INTERNAL_SERVER_ERROR,
        errorPage = '/',
        data = null
    } = {}) {
        super(message);
        this.reason = reason;
        this.statusCode = statusCode;
        this.errorPage = errorPage;
        this.data = data;
    }   
};

module.exports = ResponseError;