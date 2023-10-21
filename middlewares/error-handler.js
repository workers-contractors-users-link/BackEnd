const { StatusCodes } = require("http-status-codes");

const errorHandler = async (error, req, res, next) => {
    let customError = {
        msg: error.message || "Something went wrong, Please try again",
        status: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    };

    res.status(customError.status).json({
        msg: customError.msg,
        result: false,
    });
};

module.exports = errorHandler;
