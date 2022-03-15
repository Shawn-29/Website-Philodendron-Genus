const ResponseError = require('./response-error');
const { NOT_FOUND } = require('http-status-codes').StatusCodes;

const NotFoundError = class extends ResponseError {
    constructor({ message, reason, data }) {
        super({
            message, reason, data,
            statusCode: NOT_FOUND,
            errorPage: 'not-found'
        });
    }
}

module.exports = NotFoundError;