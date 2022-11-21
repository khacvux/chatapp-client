export interface ISignin {
  username: string;
  password: string;
}

export interface ISignup extends ISignin {
  email: string;
  username: string;
  password: string;
}

export interface IResAuth {
  id: number;
  username: string;
  email: string;
  access_token: string;
}

export interface IReturnAuth{
  access_token:string;
  id:number;
  username:string
}


export interface IAuth {
  response_message: string;
  access_token: string;
  username: string;
  email: string;
  id: number | undefined;
  fetchSignin: (data: ISignin) => void;
  fetchSignup: (data: ISignup) => void;
  setResponseMessage: (message: string) => void;
  clearAuth: () => void;
}

export interface IUser {
  email: string;
  username: string;
  id: number;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
