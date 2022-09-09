import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  themeDark = new BehaviorSubject<boolean>(false)
  constructor() { }
  getTheme(){
    return this.themeDark.asObservable();
  }
  toggleTheme(){
    this.themeDark.next(!this.themeDark.getValue());
  }
}
