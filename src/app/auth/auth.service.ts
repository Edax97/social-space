import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { AuthModel, LoginModel } from "./auth.model";
import { environment } from "src/environments/environment";
const BACKEND_URL = environment.API_URL + 'user/';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private isLogged = new BehaviorSubject<boolean>(false);
    private userId = new BehaviorSubject<string>('');
    private userName = new BehaviorSubject<string>('Home');
    private userRet = new BehaviorSubject<AuthModel|null>(null);

    private token: string|null;
    private tokenTimer: any;
    constructor(private http: HttpClient, private router: Router){}
    getToken(): string{
        return this.token;
    }
    getLoggedListener(){
        return this.isLogged.asObservable();
    }
    getIdListener(){
        return this.userId.asObservable();
    }
    getUsernameListener(){
        return this.userName.asObservable();
    }
    getUserListener(){
        return this.userRet.asObservable();
    }
    
    createUser(user: AuthModel): void{
        this.http.post
         (BACKEND_URL+'signup',  user ).subscribe({
            next: res=>{
               console.log('Signup response:',res);
               this.loginUser(user);
            }, 
            error: err => {
                this.isLogged.next(false);
            }
        })
    }

    updateUser(modUser: AuthModel): void{
        this.http.post
        (BACKEND_URL+'update', modUser).subscribe(
            res => {
                console.log('Updating profile', modUser);
                const logUser = {mail: modUser.mail, password: modUser.newpassword ?? modUser.password}
                console.log('New user credential', logUser)
                this.loginUser(logUser);
            }
        )
    }

    /*Login and Logout*/
    loginUser(user: LoginModel): void{
        this.http.post<any>
        (BACKEND_URL+'login',  user ).subscribe({
            next: res=>{
                console.log('Login response:', res);
                if (res.token) {
                    this.localLogin(res.token, +res.expiresIn, res.userData);
                    this.saveAuthData(res.token, +res.expiresIn, res.userData);        
                } 
            },
            error: e => {
                this.isLogged.next(false);
            }
        })
    }
    localLogin(token: string, expiresIn: number, userData: any){
        console.log(`Logging out in ${ expiresIn } seconds`);
        this.tokenTimer = setTimeout(()=>{
            this.logoutUser();
        }, expiresIn * 1000);
        this.token = token;
        this.isLogged.next(true);
        this.userId.next(userData._id);
        this.userName.next(userData.username ?? userData.mail);
        this.userRet.next(userData);
        this.router.navigate(['/']);
    }
    logoutUser(){
        this.token = null;
        this.isLogged.next(false);
        this.userId.next('');
        this.userName.next('Home');
        this.userRet.next(null);

        localStorage.clear()
        clearTimeout(this.tokenTimer);
        this.router.navigate(['/']);
    }
    saveAuthData(token: string, expiresIn: number, userData: any){
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        const now = (new Date()).getTime();
        console.log('Current Date', new Date());
        const expDate = new Date(now + expiresIn*1000);
        console.log(expDate)
        localStorage.setItem('expirationDate', expDate.toISOString());
    }
    autoAuth(){
        const token = localStorage.getItem('token');
        const expDate = localStorage.getItem('expirationDate');
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!token || !expDate || !userData){ return; }
        const expTime = new Date(expDate).getTime() / 1000;
        const nowTime = (new Date()).getTime() / 1000;

        if ( expTime - nowTime > 0){
            this.localLogin(token, expTime - nowTime, userData);
        }
    }

    

}