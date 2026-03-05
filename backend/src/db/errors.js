class QueryError extends Error {
    constructor(message) {
        super(message)
        this.name = "Query Error";
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "Validation Error";
    }
}


module.exports = {
    QueryError,
    ValidationError
};