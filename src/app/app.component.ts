import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ThemingService } from './theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  themeSub : Subscription;
  theme = false;
  opened = false;
  @ViewChild('sidenav', {static: true}) side: any;

  constructor(private authService: AuthService, private themingService: ThemingService, 
    private router: Router, private overlayContainer: OverlayContainer){
    
    this.themeSub =  this.themingService.getTheme().subscribe( dark=>{
      console.log('Theme dark', dark)
      if (dark){
        this.theme = true;
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
      } else {
        this.theme = false;
        this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      }
    });
    
  }
  ngAfterViewInit(){
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e) => {
      this.side.close();
    })
  }
  ngOnInit(){
    this.authService.autoAuth();
    this.themingService.retrieveTheme()
  }
  ngOnDestroy(){
    this.themeSub.unsubscribe();
  }
}

