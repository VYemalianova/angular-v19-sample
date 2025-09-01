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
