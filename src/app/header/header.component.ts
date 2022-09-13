import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ThemingService } from '../theming.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public isLogged$: Observable<boolean>;
  public username$: Observable<string>;
  public userId$: Observable<string>;

  @Output('menu') toggleNav = new EventEmitter<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private themingService: ThemingService) {
    this.isLogged$ = this.authService.getLoggedListener();
    this.userId$ = this.authService.getIdListener();
    this.username$ = this.authService.getUsernameListener();
  }

  ngOnInit(): void {
    
  }

  toggleSidenav(){
    this.toggleNav.emit(true);
  }

  toggleTheme(){
    this.themingService.toggleTheme();
  }

  logout(){
    this.authService.logoutUser();
  }

}
