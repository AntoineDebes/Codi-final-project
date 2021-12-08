import mysql from "mysql2/promise";
import config from "../../mysqlconfig";

export default async function query(sql: string, params?: any) {
  const connection: mysql.Connection = await mysql.createConnection(config.db);
  const [results]: any = await connection.execute(sql, params);

  return results;
}
