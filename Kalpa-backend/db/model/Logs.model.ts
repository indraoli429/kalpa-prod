/**
 * Modal LOGS creation
 */

export default function Logs(db: any) {
  let query = `
    create table if not exists logs(
        logsId int not null primary key AUTO_INCREMENT,
        date TIMESTAMP not null,
        remarks varchar(200) not null
        ); 
    `;

  db.query(query, (err: any, result: any) => {
    if (err) {
      console.log(err);
    }
  });
}
