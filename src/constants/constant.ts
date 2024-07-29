
export const AVATAR_API: string = "https://ui-avatars.com/api";
export const API: string = "http://localhost:1337/api";
export const AUTH_TOKEN: string = "authToken";
export const BEARER: string = "Bearer";
export interface IUser {
    id: string,
    email: string,
    username: string,
    blocked: boolean,
    confirmationtoken: string,
    confirmed: boolean,
    createdat: string,
    createdby: string,
    provider: string,
    resetpasswordtoken: string,
    role: string,
    updatedat: string,
    updatedby: string,
    actions: string,
    about: string,
    avatar_url: string
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