module.exports = (app) => {
    const exceptions = (err, req, res, next) => {
        let message;
        try {
            message = JSON.parse(err.message);
        } catch {
            message = err.message;
        }
        res.status(err.statusCode || 500).send({
            success: err.success || false,
            message,
            error: err.name || 'Error',
            ...(app.env.SERVER_ENV !== "production" ? { stack: err.stack } : {}), 
        });
    }
    app.use(exceptions);
};
