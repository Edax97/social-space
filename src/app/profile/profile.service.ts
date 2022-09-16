import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModel } from '../auth/auth.model';

const BACKEND_URL = environment.API_URL + 'profile/';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private retProfile = new BehaviorSubject<any>({});
  private profile: AuthModel;

  constructor(private http: HttpClient) { }

  
  getProfileListener(){
    return this.retProfile.asObservable();
  }


  getProfile(profileId: string){
    return this.http.get<AuthModel>
      (BACKEND_URL+'profile/'+`?profileId=${profileId}`)
      .subscribe(prof => {
        this.profile = prof;
        this.retProfile.next(this.profile);
        console.log('Profile obtained', prof)
      })
  }

  //Follow account
  follow(accountId: string){
    this.http.get<any>
    (BACKEND_URL+'follow/'+`?followedId=${accountId}`)
    .subscribe(res => {
        console.log('Follow account response: ', res);
        if (res.message === 'Following'){
          this.profile.followers.push(res.userId);
        } else {
          this.profile.followers = this.profile.followers.filter(u => u !== res.userId)
        }
        this.retProfile.next(this.profile);
    })
  }



}
