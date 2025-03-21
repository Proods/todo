export const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500)
        .json({
            status: 500,
            message: 'Something went wrong',
            error: err.message,
        });
}

export const responseHandler = (res, status, message, data) => {
    console.log(message);
    res.status(status)
        .json({
            status,
            message,
            data,
        });
}