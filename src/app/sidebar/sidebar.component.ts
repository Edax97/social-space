import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public logged$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.logged$ = this.authService.getLoggedListener();
  }

}
