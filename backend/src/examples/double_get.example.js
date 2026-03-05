const { QueryHelper, db } = require("../db");

const users = new QueryHelper("users", db);

(async () => {
  try {
    // First get with conditions
    const first = await users
      .select(["id", "email"])
      .where("UserId", "2")
      .orderBy("created_at", "DESC")
      .limit(5)
      .get();
    console.log('First result rows:', first.length);

    // Second get immediately after (no new builder calls)
    const second = await users
    .where(["name", "af94c066-106c-4064-b7c5-9ba947c122f8"])
    .delete();
    console.log('Second result rows:', second.length);
  } catch (err) {
    console.error('ERROR:', err.message);
  }
})();