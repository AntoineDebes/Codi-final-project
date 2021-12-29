import query from "./db";

export const isAdminCheckMiddleware = async (userID: string | number) => {
  const [{ isAdmin }] = await query(`SELECT * FROM users WHERE ID=?`, [userID]);

  return isAdmin;
};
