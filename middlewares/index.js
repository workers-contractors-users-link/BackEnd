const errorHandler = require("./error-handler");
const pageNotFound = require("./page-not-found");
const authMiddleware = require("./auth-middleware");

module.exports = {
    errorHandler,
    pageNotFound,
    authMiddleware,
};
