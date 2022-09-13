export interface AuthModel{
    mail: string,
    password: string,
    newpassword?: string,
    username?: string,
    name?: string,
    lastname?: string,
    _id?: string,
}

export interface LoginModel{
    mail: string,
    password: string
}