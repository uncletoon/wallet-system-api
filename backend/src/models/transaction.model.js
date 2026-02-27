async function createTransaction(
  client,
  walletId,
  type,
  amount,
  balanceBefore,
  balanceAfter,
) {
  return client.query(
    `INSERT INTO transactions
    (wallet_id, type, amount, balance_before, balance_after) 
    VALUES($1,$2,$3,$4,$5)`,
    [walletId, type, amount, balanceBefore, balanceAfter],
  console.log("Insert transaction Done")
  );
}

async function calculateBalance(client, walletId) {
  const result = await client.query(
    `
    SELECT COALESCE(SUM(
    CASE
    WHEN type='deposit' THEN amount
    WHEN type='withdraw' THEN -amount
    END
    ),0) AS balance
    FROM transactions
    WHERE wallet_id=$1
    `,
    [walletId]
  );
  return Number(result.rows[0].balance);
}

async function getTransactionsByWallet(client, walletId) {
  const result = await client.query(
    `
    SELECT * 
    FROM transactions
    WHERE wallet_id = $1
    ORDER BY created_at DESC
    `,
    [walletId],
  );

  return result.rows;
}

module.exports = {
  createTransaction,
  calculateBalance,
  getTransactionsByWallet,
};
