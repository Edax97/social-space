import { Component, OnInit} from '@angular/core';
import { Post } from '../models';
import { PostsService } from '../posts.service';
import { Observable } from "rxjs";
import { PageEvent } from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AuthModel } from 'src/app/auth/auth.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{
  isLoading$ : Observable<boolean>;
  userId$: Observable<string>;
  postsData$: Observable<{posts: Post[], maxPosts: NumberInput}>;
  currentPage = 1;
  postsPerPage = 5;
  mode = '';
  
  constructor( private service: PostsService, private authService: AuthService, private route: ActivatedRoute){
    [this.postsData$, this.isLoading$] = this.service.getUpdateListener();
    this.userId$ = this.authService.getIdListener();
  }
  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      if (params.has('page')){
        console.log('Page: ', params.get('page'));
        this.currentPage = +params.get('page');
      }
      else if (params.has('displayed')){
        this.postsPerPage = +params.get('displayed');
        console.log('Displayed', this.postsPerPage)
      }
      
      console.log(this.currentPage, this.postsPerPage)
      if (this.route.snapshot.url[0]){
        this.mode = 'following';
        this.service.getFollowedPosts(this.postsPerPage, this.currentPage);
      } else {
        this.service.getPosts(this.postsPerPage, this.currentPage);
      }
    }) 
  }
  onPage(data: PageEvent){
    console.log(data);
    this.postsPerPage = data.pageSize;
    this.currentPage = data.pageIndex + 1;
    if (this.mode == 'following'){
      this.service.getFollowedPosts(this.postsPerPage, this.currentPage);
    } else {
      this.service.getPosts(this.postsPerPage, this.currentPage);
    }
  }

}
