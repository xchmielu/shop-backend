export const notFoundMiddleware = (req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
};

export const handleErrorsMiddleware = (error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
};
