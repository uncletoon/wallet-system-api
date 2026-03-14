// Create wallet using QueryHelper for simple inserts
const {QueryHelper} = require("../db");
const db = require("../config/database");

class WalletRepository{
  constructor(){
    this.wallets = new QueryHelper("wallets", db);
  }

  async createWallet(userId, initialBalance = 0) {
  const wallets = new QueryHelper("wallets", db);
  return await wallets.create({ userId, balance: initialBalance });
}
}


async function findById(client, walletId) {
  const result = await client.query(
    "SELECT * FROM wallets WHERE id=$1 FOR UPDATE",
    [walletId]
  );
  return result.rows[0];
}

module.exports = new WalletRepository();