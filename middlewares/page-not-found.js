const { StatusCodes } = require("http-status-codes");

const pageNotFound = async (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        msg: `Route : ${req.path} does not exits`,
        status: false,
    });
};

module.exports = pageNotFound;
