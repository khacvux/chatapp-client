export interface ISignin {
  username: string;
  password: string;
}

export interface ISignup extends ISignin {
  email: string;
}

export interface IResAuth {
  status: Boolean;
  id: number;
  username: string;
  email: string;
  access_token: string;
}

export interface IAuth {
  message: string;
  access_token: string;
  username: string;
  email: string;
  id: number | undefined;
  fetchSignin: (data: ISignin) => void;
  clearAuth: () => void;
}


export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
