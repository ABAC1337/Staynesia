const ErrorHandler = require('../../../utils/errorHandler');

module.exports = (error, req, res, next) => {
    let err = { ...error };
    err.message = error.message;

    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        const message = `${field} already used`;
        err = new ErrorHandler(message, 400);
    }

    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(val => val.message);
        err = new ErrorHandler(message[0], 400);
    }

    if (error.name === 'CastError') {
        const message = `Resource not found with id of ${error.value}`;
        err = new ErrorHandler(message, 404);
    }

    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    if (process.env.NODE_ENV === 'production') {
        return res.status(statusCode).json({
            status: status,
            message: err.message
        });
    } else if (process.env.NODE_ENV === 'development') {
        return res.status(statusCode).json({
            status: status,
            message: err.message,
            stackTrace: err.stack,
            error: err
        });
    } else {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};
