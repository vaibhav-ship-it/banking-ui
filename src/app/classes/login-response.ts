export class LoginResponse {
    authResponse : Map<string,string>  = new Map<string,string>();

    getAuthResponse() : Map<string,string>  {
        return this.authResponse;
    }

    setAuthResponse(authResponse : Map<string,string>) : void   {
        this.authResponse = authResponse;
    }
}
