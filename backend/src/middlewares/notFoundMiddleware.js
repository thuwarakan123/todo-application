const notFound = (req, res, next) => {
    res.status(404);
    res.json({
        success: false,
        message: `Not Found The URL - ${req.originalUrl}`,
        data: null
    });
};

module.exports = notFound;