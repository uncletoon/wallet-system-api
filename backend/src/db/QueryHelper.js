const QueryState = require("./QueryState");
const SqlCompiler = require("./SQLCompiler");
const { QueryError, ValidationError } = require("./errors");

class QueryHelper {
  constructor(table, db) {
    if (!table) throw new QueryError("Table name required");
    if (!db) throw new QueryError("Database instance required");

    this.db = db;
    this.state = new QueryState();
    this.state.table = table;
  }

  select(fields) {
    this.state.fields = fields;
    return this;
  }

  where(field, value, operator = "=") {
    this.state.where.push({ field, operator, value });
    return this;
  }

  limit(n = 100) {
    this.state.limit = n;
    return this;
  }

  offset(n) {
    this.state.offset = n;
    return this;
  }

  orderBy(field, direction = "ASC") {
    this.state.orderBy.push({ field, direction });
    return this;
  }

  //CREATE
  async create(data) {
    const { sql, values } = SqlCompiler.compilerInsert(this.state.table, data);
    console.log("SQL:", sql);
    console.log("VALUES:", values);

    const result = await this.db.query(sql, values);
    return result.rows[0];
  }

  //GET
  async get() {
    const { sql, values } = SqlCompiler.compilerSelect(this.state);
    console.log("SQL:", sql);
    console.log("VALUES:", values);

    const result = await this.db.query(sql, values);

    this.state.reset(); // VERY IMPORTANT

    return result.rows;
  }

  //DELETE
  async delete(id) {
    if (id === undefined || id === null) {
      throw new QueryError("delete requires an id");
    }

    const table = this.state.table;
    const sql = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
    const values = [id];
    console.log("SQL:", sql);
    console.log("VALUES:", values);

    const result = await this.db.query(sql, values);
    this.state.reset();
    return result.rows[0] || { success: true };
  }

  //UPDATE
  async update(id, data) {
    if (id === undefined || id === null) {
      throw new ValidationError("Update requires an ID")
    }
    const { sql, values } = SqlCompiler.compilerUpdate(this.state.table, data, id);
    const result = await this.db.query(sql, values);

    this.state.reset();
    return result.rows[0];
  }

  async findById(id) {
    this.state.reset();
    return this.where("id", id).limit(1).get();
  }

  async findOne() {
    return this.limit(1).get();
  }

  async findFirst(n = 1) {
    this.state.reset();
    return this.orderBy("id", "ASC").limit(n).get();
  }

  async findLast(n = 1) {
    this.state.reset();
    return this.orderBy("id", "DESC").limit(n).get();
  }
}

module.exports = QueryHelper;
