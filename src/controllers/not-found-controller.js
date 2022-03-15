const { NOT_FOUND } = require('http-status-codes').StatusCodes;

const controller = (req, res) => {
    res.status(NOT_FOUND)
        .render('not-found');
};

module.exports = controller;