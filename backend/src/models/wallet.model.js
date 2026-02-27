async function findById(client, walletId){
  const result = await client.query(
    "SELECT * FROM wallets WHERE id=$1 FOR UPDATE",
    [walletId]
  );

  return result.rows[0];
}


async function updateBalance(client, walletId, newBalance){
  return client.query(
    "UPDATE wallets SET balance=$1 WHERE id=$2",
    [newBalance, walletId]
  );
}

const pool = require("../config/database");

async function findWalletById(id) {
  const result = await pool.query(
    "SELECT * FROM wallets WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

module.exports = {
  findById,
  updateBalance,
  findWalletById
}
