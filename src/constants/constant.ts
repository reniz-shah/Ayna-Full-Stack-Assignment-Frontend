
export const AVATAR_API: string = "https://ui-avatars.com/api";
export const API: string = "http://localhost:1337/api";
export const SERVER: string = "http://localhost:1337";
export const AUTH_TOKEN: string = "authToken";
export const USER: string = "user";
export const BEARER: string = "Bearer";
export interface IUser {
    id : string,
    username : string,
    email : string,
    provider : string,
    confirmed : boolean,
    blocked : boolean,
    createdAt : string,
    updatedAt : string,
}

export interface IAuthContext {
    user: IUser | undefined,
    isLoading: boolean,
    setUser: CallableFunction,
}

export const BaseAuthContext: IAuthContext = {
    user: undefined,
    isLoading: false,
    setUser: () => null
}