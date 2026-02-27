CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId INTEGER NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance NUMERIC(15,2) NOT NULL DEFAULT 0 CHECK (balance >= 0),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id),
  type VARCHAR(20) CHECK (type IN ('deposit','withdraw')),
  amount NUMERIC(15,2) NOT NULL,
  balanceBefore NUMERIC(15,2) NOT NULL,
  balanceAfter NUMERIC(15,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);