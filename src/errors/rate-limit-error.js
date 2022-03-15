const ResponseError = require('./response-error');
const { TOO_MANY_REQUESTS } = require('http-status-codes').StatusCodes;

const RateLimitError = class extends ResponseError {
    constructor({ message, reason, data }) {
        super({
            message, reason, data,
            statusCode: TOO_MANY_REQUESTS,
            errorPage: 'rate-limit'
        });
    }
}

module.exports = RateLimitError;