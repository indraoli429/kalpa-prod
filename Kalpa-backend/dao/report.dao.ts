import moment from "moment";
import dbPromise from "../db/SQLDBPromise";
import getLateDate from "../helper/getLateDate";
import splitDate from "../helper/splitDate";

class ReportDAO {
  constructor() {
    console.log(`Generate new instance of DAO`);
  }

  async readAllByDate(givenDate: Date) {
    console.log(givenDate);

    let lateDate = splitDate(getLateDate(givenDate));

    console.log(`late date`);

    console.log(lateDate);

    const sql = `                 
        SELECT * FROM billing WHERE bill_date 
        BETWEEN '${givenDate}' AND '${lateDate}' 
        AND is_deleted IS FALSE

    `;
    try {
      const [rows, fields] = await dbPromise.execute(sql);

      console.log(`report DAO`);
      console.log(rows);

      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

export default new ReportDAO();
