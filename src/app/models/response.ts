import { IUser } from "./user.model";

export interface IResponse<T> {
  success: boolean;
  message?: string;
  errors?: string | IFieldError[];
  data?: T;
}

export interface IFieldError {
  path: string;
  msg: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}
