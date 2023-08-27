import moment from "moment";
import dbPromise from "../db/SQLDBPromise";
import { LogDto } from "../dto/log.dto";

class LogDAO {
  constructor() {
    console.log(`Generate new instance of LogDAO`);
  }

  async create(log: LogDto) {
    const date = moment().format();

    const sql = `
    INSERT INTO logs(date, remarks) VALUES("${date}","${log.remarks}");
      `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async readAll() {
    const sql = `
                    SELECT * FROM logs
    `;
    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

export default new LogDAO();
