import query from "./db";

export const isAdminCheck = async (userID: string | number) => {
  const [{ isAdmin }] = await query(`SELECT * FROM users WHERE ID=?`, [userID]);

  if (isAdmin !== 1) {
    throw new Error("You aren't an admin");
  }
};
