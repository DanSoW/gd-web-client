export interface IAuthModel {
  access_token: string | null;
  refresh_token: string | null;
}

export interface ISignIn {
  email: string | null;
  password: string | null;
}
