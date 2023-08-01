const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.json({
        error: err.message,
    })
}

module.exports = errorHandler