import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule, } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material.module';
import { PostsRoutingModule } from './posts-routing.module';
import { PostCreate } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileListComponent } from './profile-list/profile-list.component';


@NgModule({
  declarations: [
    PostCreate,
    PostListComponent,
    PostsComponent,
    ProfileListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
