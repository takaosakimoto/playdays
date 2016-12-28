export interface ISearchUserByNameRequest {
	name: string;
}

export interface IAuthenticationStatus {
	status: string;
  	authResponse: {
	    userID: string;
	    accessToken: string;
	    expiresIn: number;
  	};
}
