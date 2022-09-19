import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AuthModel } from '../auth/auth.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  @Input() profileId!: string;
  @Input() userId = '';

  profileInfo$ : Observable<AuthModel|null>;

  constructor(private profileService: ProfileService) { 
  }

  ngOnInit(): void {
    this.profileInfo$ = this.profileService.getProfile(this.profileId)
      .pipe(catchError(e=>of(null)))
  }


  onFollow(){
    this.profileService.follow(this.profileId);
  }

}
