import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() isLoading! : boolean;
  @Input() buttonLabel! : string;
  @Input() fieldList : {holder: string, fieldname: string, required: boolean}[] = [];

  @Output('user') userData = new EventEmitter<{mail: string, password: string}>();
  constructor() { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    console.log(form.value);
    if (form.valid){
      this.userData.emit(form.value);

    }
  }

}
