class QueryState{
    constructor() {
        this.reset();
    }

    reset() {
        this.fields = ["*"];
        this.where = [];
        this.limit = null;
        this.offset = null;
        this.orderByFields = null;
        this.orderBy = [];
    }
}


module.exports = QueryState;