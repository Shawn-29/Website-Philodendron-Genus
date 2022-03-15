const { INTERNAL_SERVER_ERROR } = require('http-status-codes').StatusCodes;

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
    const errorPage = err.errorPage || 'error';

    err.time = new Intl.DateTimeFormat(
        'en-us', {
        dateStyle: 'full', timeStyle: 'long'
    }).format(new Date());

    err.ip = req.ip;

    console.log(err);

    res.status(statusCode)
        .render(errorPage);
};

module.exports = errorHandler;