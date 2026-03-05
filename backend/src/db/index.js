const pool = require("../config/database");
const QueryHelper = require("./QueryHelper");

// Export the QueryHelper class and the raw DB pool/connection.
// Do not instantiate QueryHelper here — callers must pass a table name
// when creating a helper instance: `new QueryHelper("table", db)`.
module.exports = {
  QueryHelper,
  db: pool,
};