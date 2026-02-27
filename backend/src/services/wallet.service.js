const pool = require("../config/database");
const walletModel = require("../models/wallet.model");
const transactionModel = require("../models/transaction.model");

async function deposit(walletId, amount) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // lock wallet
    const wallet = await walletModel.findById(client, walletId);
    console.log("Lock Done...");

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    const balanceBefore = await transactionModel.calculateBalance(
      client,
      walletId,
    );
    const balanceAfter = balanceBefore + Number(amount);

    // insert transaction (pass both balanceBefore and balanceAfter)
    await transactionModel.createTransaction(
      client,
      walletId,
      "deposit",
      amount,
      balanceBefore,
      balanceAfter,
    );

    // Update balance in wallet
    await walletModel.updateBalance(client, walletId, balanceAfter);
    console.log("Deposit Done..");

    await client.query("COMMIT");

    return balanceAfter;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function withdraw(walletId, amount) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const wallet = await walletModel.findById(client, walletId);
    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    const balanceBefore = await transactionModel.calculateBalance(client, walletId);
    const balanceAfter = balanceBefore - Number(amount);

    await transactionModel.createTransaction(
      client,
      walletId,
      "withdraw",
      amount,
      balanceBefore,
      balanceAfter,
    );

    await walletModel.updateBalance(client, walletId, balanceAfter);

    await client.query("COMMIT");

    return balanceAfter;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  deposit,
  withdraw,
};
