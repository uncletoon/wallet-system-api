const pool = require("../config/database");

async function create(
  client,
  walletId,
  type,
  amount,
  balanceBefore,
  balanceAfter,
) {
  return client.query(
    `
    INSERT INTO transactions
    (wallet_id, type, amount, balance_before, balance_after)
    VALUES ($1,$2,$3,$4,$5)
    `,
    [walletId, type, amount, balanceBefore, balanceAfter],
  );
}

async function findByWalletId(walletId) {
  const result = await pool.query(
    `
    SELECT * FROM transactions
    WHERE wallet_id=$1
    ORDER BY created_at DESC
    `,
    [walletId],
  );
  return result.rows;
}

async function getDailyDeposits() {
  const result = await pool.query(`
    SELECT DATE(created_at) as day,
           SUM(amount) as total_deposits
    FROM transactions
    WHERE type='deposit'
    GROUP BY day
    ORDER BY day DESC
  `);
  return result.rows;
}

async function getDailyWithdrawals() {
  const result = await pool.query(`
    SELECT DATE(created_at) as day,
           SUM(amount) as total_withdrawals
    FROM transactions
    WHERE type='withdraw'
    GROUP BY day
    ORDER BY day DESC
  `);
  return result.rows;
}

module.exports = {
  create,
  findByWalletId,
  getDailyDeposits,
  getDailyWithdrawals,
};
