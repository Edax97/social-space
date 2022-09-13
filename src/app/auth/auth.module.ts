import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { FormComponent } from './form/form.component';
import { SignupComponent } from './signup/signup.component';
import { AngularMaterialModule } from '../angular-material.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';


@NgModule({
  declarations: [
    LoginComponent,
    FormComponent,
    SignupComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
