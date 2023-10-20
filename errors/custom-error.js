class CustomError extends Error {
    /**
     * Constructor function.
     *
     * @param {type} message - message parameter
     */
    constructor(message) {
        super(message);
    }
}

module.exports = CustomError;
