const notFoundHandle = (req, res) => {
    res.status(404).json({
            message: "Router does not exist"
        }
    )
}

module.exports = notFoundHandle;