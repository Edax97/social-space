import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  isLogged$: Observable<boolean>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged$ = this.authService.getLoggedListener();
  }

  onLogOut(){
    this.authService.logoutUser();
  }



}
