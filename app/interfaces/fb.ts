export interface IFBAuthenticationRequest {
  type: string;
}

export interface IFBAuthenticationStatus {
  status: string;
  authResponse: {
    userID: string;
    accessToken: string;
    expiresIn: number;
    session_key: boolean;
  };
}

export interface IFBCurrentUser {
  id: number;
  name: string;
  email: string;
}
