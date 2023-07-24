const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.json({
        error: err.message,
    })
}

module.exports = errorHandler