export interface AuthModel{
    mail: string,
    password: string,
    newpassword?: string,
    username?: string,
    name?: string,
    lastname?: string,
    _id?: string,
    profilepic?: string,
    bio?: string,
    following?: string[],
    followers?: string[], 
}

export interface LoginModel{
    mail: string,
    password: string
}