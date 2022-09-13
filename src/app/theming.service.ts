import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemingService{
  themeDark = new BehaviorSubject<boolean>(false)
  constructor() { }
  
  retrieveTheme(){
    if (localStorage.getItem('theme')==='dark'){
      this.themeDark.next(true);
    };
    if (localStorage.getItem('theme')==='light'){
      this.themeDark.next(false);
    }
  }
  getTheme(){
    return this.themeDark.asObservable();
  }
  toggleTheme(){
    this.themeDark.next(!this.themeDark.getValue());
    if (this.themeDark.getValue()){
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
}
