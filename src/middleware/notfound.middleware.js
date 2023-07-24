const notFoundHandle = (req, res) => {
    res.json({
            message: "Router does not exist"
        }
    )
}

module.exports = notFoundHandle;