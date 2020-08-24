import databaseConfig from '../config/database';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = databaseConfig;
  }
}

export default new Database();
