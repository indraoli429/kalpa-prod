import { CRUD } from "../common/crud.interface";
import logDao from "../dao/log.dao";
import { LogDto } from "../dto/log.dto";

class LogService implements CRUD {
  async create(log: LogDto) {
    return logDao.create(log);
  }

  async readAll() {
    return logDao.readAll();
  }

  async readById(id: number) {}

  async updateById(log: LogDto) {}

  async deleteById(id: number) {}
}

export default new LogService();
