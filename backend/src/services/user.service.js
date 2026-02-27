const pool = require("../config/database");

async function createUserWithWallet(name, email, userId) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    // insert user
    const userResult = await client.query(
      "INSERT INTO users(name, email, userId) VALUES($1,$2,$3) RETURNING *",
      [name, email,userId],
    );
    const user = userResult.rows[0];

    // create wallet linked to user
    const walletResult = await client.query(
      "INSERT INTO wallets(userId) VALUES($1) RETURNING *",
      [user.id],
    );

    const wallet = walletResult.rows[0];

    await client.query("COMMIT");

    return { user, wallet };

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

}

module.exports = {
  createUserWithWallet,
};