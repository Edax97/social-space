import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ThemingService } from './theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  themeDark$ : Observable<boolean>;
  constructor(private authService: AuthService, private themingService: ThemingService){
    this.themeDark$ = this.themingService.getTheme();
  }
  ngOnInit(){
    this.authService.autoAuth();
    this.themingService.retrieveTheme()
  }
  
}
