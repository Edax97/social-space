import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthModel } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  loading = false;
  fields = [
    {holder: 'Email', fieldname: 'mail', required: true, type: 'mail', disabled: true},
    {holder: 'Current password', fieldname: 'password', required: true, type: 'password'},
    {holder: 'New password', fieldname: 'newpassword', type: 'password'},
    {holder: 'Username', fieldname: 'username'},
    {holder: 'First name', fieldname: 'name'},
    {holder: 'Last name', fieldname: 'lastname'},
    {holder: 'Biography', fieldname: 'bio', multiline: true},
    
  ];
  loggedSub: Subscription;
  profileSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedSub = this.authService.getLoggedListener().subscribe(login => {
      this.loading = false;
    })
    this.profileSub = this.authService.getUserListener().subscribe(loggedUser => {
      loggedUser.password = '';
      this.fields = this.fields
        .map(f=> {
          const fmod = {...f, value: loggedUser[f.fieldname] ?? ''}
          return fmod;
        })
    })
  }
  onUpdate(user: AuthModel){
    this.loading = true;
    this.authService.updateUser(user);
  }
  ngOnDestroy(): void {
    this.loggedSub.unsubscribe();
    this.profileSub.unsubscribe();
  }
}
