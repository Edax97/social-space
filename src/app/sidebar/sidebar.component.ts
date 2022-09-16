import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from 'express';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ThemingService } from '../theming.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public logged$: Observable<boolean>;
  public darkTheme$: Observable<boolean>;
  public userId$: Observable<string>;

  constructor(private authService: AuthService, private themingService: ThemingService) { }

  ngOnInit(): void {
    this.logged$ = this.authService.getLoggedListener();
    this.darkTheme$ = this.themingService.getTheme();
    this.userId$ = this.authService.getIdListener();
  }

  toggleTheme(){
    this.themingService.toggleTheme();
  }

  onSignOut(){
    this.authService.logoutUser();
  }

}
