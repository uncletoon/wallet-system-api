const { QueryHelper } = require("../db");
const db = require("../config/database");

class UserRepository {
  constructor() {
    this.users = new QueryHelper("users", db);
  }

  async createUser(name, email, userId) {
    // validate required fields before calling DB
    if (!name || !email || !userId) {
      throw new Error(
        "Missing required fields: name, email and userId are required",
      );
    }
    return await this.users.create({ name, userId, email });
  }

  async getAllUsers() {
    return await this.users
      .select(["id", "name", "email", "created_at"])
      .orderBy("created_at", "DESC")
      .limit()
      .get();
  }

  async getUserById(id) {
    return await this.users.findById(id);
  }

  async deleteUser(id) {
    const existing = await this.users.findById(id);
    if (!existing || existing.length === 0) {
      throw new Error("User Not exist");
    }
    return await this.users.delete(id);
  }

  async updateUser(id, updates, email) {
    const existing = await this.users.findById(id);
    if (!existing || (Array.isArray(existing) && existing.length === 0)) {
      throw new Error('User Not exist');
    }

    const data = {};
    // support object payload: updateUser(id, { name, email, userId })
    if (updates && typeof updates === 'object' && !Array.isArray(updates)) {
      const allowed = ['name', 'email', 'userId'];

      for (const key of allowed) {
        if (updates[key] !== undefined && updates[key] !== null) {
          data[key] = updates[key];
        }
      }
    } 
    else {
      // legacy signature: updateUser(id, name, email)
      if (updates !== undefined && updates !== null) data.name = updates;
      if (email !== undefined && email !== null) data.email = email;
    }

    if (Object.keys(data).length === 0) {
      throw new Error('No fields to update');
    }

    return this.users.update(id, data);
  }
}

module.exports = new UserRepository();
