# Query Helper Library

## Overview

Query Helper is a lightweight query builder for Node.js designed to simplify database operations when using PostgreSQL. It provides a structured way to build SQL queries while keeping application code clean and maintainable.

The helper separates **query state**, **SQL compilation**, and **execution logic** into different modules.

Architecture:

* QueryHelper: Main interface used by developers
* QueryState:  Stores the current query configuration
* SqlCompiler: Converts query state into SQL
* Errors: Custom error classes

---

# Installation

Copy the helper files into your project:

```
queryHelper/
  QueryHelper.js
  QueryState.js
  SQLCompiler.js
  errors.js
  index.js
```

Make sure you have a PostgreSQL pool configured:

```javascript
cconst { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = pool;
```

---

# Usage

Import the helper:

```javascript
const { QueryHelper, db } = require("./queryhelper");

const users = new QueryHelper("users", db);
```

---

# Basic Query Methods

## Select

```javascript
const users = new QueryHelper("users", db);

const result = await users
  .select(["id", "name", "email"])
  .where("active", true)
  .limit(10)
  .get();
```

Generated SQL:

```
SELECT id, name, email
FROM users
WHERE active = $1
LIMIT 10
```

---

## Where

Adds filtering conditions.

```javascript
await users.where("email", "test@mail.com").get();
```

You can also define operators.

```javascript
await users.where("balance", 100, ">=").get();
```

---

## Order By

```javascript
await users
  .orderBy("created_at", "DESC")
  .limit(5)
  .get();
```

---

## Offset

```javascript
await users
  .limit(10)
  .offset(20)
  .get();
```

Used for pagination.

---

# Create (Insert)

```javascript
const user = await users.create({
  name: "John",
  email: "john@mail.com",
  role: "admin"
});
```

Generated SQL:

```
INSERT INTO users (name, email, role)
VALUES ($1, $2, $3)
RETURNING *
```

---

# Update

```javascript
await users.update("user-id", {
  name: "Updated Name",
  role: "editor"
});
```

Generated SQL:

```
UPDATE users
SET name = $1, role = $2
WHERE id = $3
RETURNING *
```

---

# Delete

```javascript
await users.delete("user-id");
```

Generated SQL:

```
DELETE FROM users
WHERE id = $1
RETURNING *
```

---

# Helper Methods

## findById

```javascript
await users.findById("uuid-id");
```

Equivalent to:

```
SELECT * FROM users
WHERE id = $1
LIMIT 1
```

---

## findOne

Returns a single record.

```javascript
await users
  .where("email", "john@mail.com")
  .findOne();
```

---

## findFirst

Returns the first N rows ordered by ID ascending.

```javascript
await users.findFirst(5);
```

---

## findLast

Returns the last N rows ordered by ID descending.

```javascript
await users.findLast(5);
```

---

# Internal Architecture

## QueryState

QueryState stores the current query configuration before compilation.

Example state:

```
{
  table: "users",
  fields: ["id", "name"],
  where: [{ field: "active", operator: "=", value: true }],
  limit: 10,
  offset: 0
}
```

---

## SqlCompiler

The SQLCompiler converts QueryState into SQL queries.

Example:

```
QueryState -> SQLCompiler -> SQL Query
```

Example compiled SQL:

```
SELECT id, name FROM users WHERE active = $1
```

---

## Errors

Two custom errors are used:

### QueryError

Used for invalid query configuration.

Example:

```javascript
throw new QueryError("Table name required");
```

### ValidationError

Used when input data is invalid.

Example:

```javascript
throw new ValidationError("Update requires an ID");
```

---

# State Reset

After every query execution, the helper resets its internal state:

```javascript
this.state.reset();
```

This prevents query conditions from leaking into the next query.

Example problem without reset:

```
users.where("active", true).get()
users.get()
```

Without reset the second query would still contain `WHERE active = true`.

---

# Example Real Usage (Repository Layer)

```
const { QueryHelper, db } = require("../db");

class UserRepository {
  constructor() {
    this.users = new QueryHelper("users", db);
  }

  async createUser(data) {
    return this.users.create(data);
  }

  async getUser(id) {
    return this.users.findById(id);
  }

  async updateUser(id, data) {
    return this.users.update(id, data);
  }

  async deleteUser(id) {
    return this.users.delete(id);
  }
}
```

---

# Benefits

• Reduces repetitive SQL

• Prevents SQL injection using parameterized queries
• Clean repository/service architecture
• Reusable query builder
• Easy to extend

---

# Future Improvements

Possible enhancements:

* JOIN support
* Transactions support
* Error Handling
* Aggregation functions
* Soft delete
* Schema validation

---

# Author

Backend Developer focused on:

* Backend Architecture
* PostgreSQL Database Design
* Financial-grade backend systems
* Scalable SaaS platforms
