import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthModel } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  loading = false;
  fields = [
    {holder: 'Username', fieldname: 'username', required: true},
    {holder: 'First name', fieldname: 'name', required: false},
    {holder: 'Last name', fieldname: 'lastname', required: false},
  ];
  isLogged: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.getLoggedListener().subscribe(login => {
      this.loading = false;
    })
  }

  onSigningUp(user: AuthModel){
    this.loading = true;
    this.authService.createUser(user);
  }

  ngOnDestroy(): void {
    this.isLogged.unsubscribe();
  }

}
