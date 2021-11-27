import mysql from "mysql2/promise";
import config from "../../mysqlconfig";

async function query(sql: string, params: any) {
  const connection: mysql.Connection = await mysql.createConnection(config.db);
  const [results]: any = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query,
};
