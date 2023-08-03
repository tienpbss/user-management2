const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        err: err.message,
        error: 'An error occurred'
    })
}

module.exports = errorHandler