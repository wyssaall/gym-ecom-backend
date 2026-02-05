const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const isOperational = err.isOperational || false; // Check if it's a trusted error

    res.status(statusCode);

    const response = {
        status: err.status || 'error',
        message: err.message,
    };

    // Include stack trace only in development
    if (process.env.NODE_ENV !== 'production') {
        response.stack = err.stack;
    }

    res.json(response);
};

export { errorHandler };
