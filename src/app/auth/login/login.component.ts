import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthModel, LoginModel } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  isLogged: Subscription;
  fields = [
    {holder: 'Email', fieldname: 'mail', required: true, type: 'email'},
    {holder: 'Password', fieldname: 'password', required: true, type: 'password'},
  ]

  constructor(private authService: AuthService) { 
  }
  

  ngOnInit(): void {
    this.isLogged = this.authService.getLoggedListener().subscribe(login => {
        this.loading = false;
    })
  }

  onLogin(user: LoginModel){
    this.loading = true;
    this.authService.loginUser(user);
  }

  ngOnDestroy(): void {
    this.isLogged.unsubscribe();
  }

}
