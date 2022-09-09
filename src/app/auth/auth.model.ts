export interface AuthModel{
    mail: string,
    password: string,
    username?: string,
    name?: string,
    lastname?: string,
}

export interface LoginModel{
    mail: string,
    password: string
}