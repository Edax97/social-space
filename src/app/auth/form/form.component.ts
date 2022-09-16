import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() isLoading! : boolean;
  @Input() buttonLabel! : string;
  @Input() fieldList : {holder: string, fieldname: string, required?: boolean, type?: string, 
    value?: string, disabled?: boolean, multiline?: boolean}[] = [];

  @Output('user') userData = new EventEmitter<{mail: string, password: string}>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    console.log(form.value);
    if (form.valid){
      this.userData.emit(form.value);
    }
  }

  onCancel(){
    this.router.navigate(['/'])
  }

}
