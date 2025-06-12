const ErrorHandler = require('../../../utils/errorHandler')

const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    });
}

const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}!`
    return new CustomError(msg, 400);
}

const duplicateKeyErrorHandler = (err) => {
    const name = err.keyValue.name;
    const msg = `There is already a movie with name ${name}. Please use another name!`;

    return new CustomError(msg, 400);
}

const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const errorMessages = errors.join('. ');
    const msg = `Invalid input data: ${errorMessages}`;

    return new CustomError(msg, 400);
}


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

    error.statusCode = err.statusCode || 500;
    error.status = err.status || 'error';

    if (process.env.NODE_ENV === 'production') {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: err.message
        });
    }else if (process.env.NODE_ENV === 'development') {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: err.message,
            stackTrace: error.stack,
            error: error
        });
    } else
        res.status(500)
}