const { QueryHelper } = require("../db");
const db = require("../config/database");

const users = new QueryHelper("users", db);

users
  .select(["id", "email"])
  .where("name", "John")
  .orderBy("created_at", "DESC")
  .limit(5)
  .get();