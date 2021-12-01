export type UserRegisterModel = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  phone: number;
  address: string;
  confirmPassword?: string;
};

export type ResponseErrorMessageModel = {
  userNameDuplicate?: string;
  phoneDuplicate?: string;
  emailDuplicate?: string;
};
