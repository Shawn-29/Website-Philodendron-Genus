const ResponseError = require('./response-error');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes').StatusCodes;

const ServerError = class extends ResponseError {
    constructor({ message, reason, data }) {
        super({
            message, reason, data,
            statusCode: INTERNAL_SERVER_ERROR,
            errorPage: 'error'
        });
    }
}

module.exports = ServerError;