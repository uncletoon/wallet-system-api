
const userRepository = require("../repositories/user.repo");
const walletRepository = require("../repositories/wallet.repo");

class UserService {
  async createUser(name, email, userId) {
    // support both: createUser({name, email, userId}) and createUser(name, email, userId)
    if (name && typeof name === 'object' && !Array.isArray(name)) {
      const payload = name;
      const created = await userRepository.createUser(payload.name, payload.email, payload.userId);
      await walletRepository.createWallet(created.id);
      return created;
    }

    const created = await userRepository.createUser(name, email, userId);
    await walletRepository.createWallet(created.id);
    return created;
    
  }
  
  async getUsers() {
    return await userRepository.getAllUsers();
  }

  async getUser(id) {
    return await userRepository.getUserById(id);
  }
  async deleteUser(id) {
    return await userRepository.deleteUser(id);
  }
  async userUpdadate(id, name, email) {
    return await userRepository.updateUser(id, name, email, );
  }
}

module.exports = new UserService();