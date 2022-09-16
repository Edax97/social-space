import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthModel } from '../auth/auth.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @Input() profileInfo!: AuthModel;
  @Input() userId = '';
  @Output('follow') followed = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }


  onFollow(){
    this.followed.emit(this.profileInfo._id);
  }

}
