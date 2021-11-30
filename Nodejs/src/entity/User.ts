export type UserModelLogin = {
  email: string;
  password: string;
};

export interface UserModelCreate extends UserModelLogin {
  firstName: string;
  lastName: string;
  userName: string;
  phone: number;
  address: string;
  verified: number;
  cartID?: number;
}
