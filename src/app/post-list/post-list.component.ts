import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../models';
import { PostsService } from '../posts.service';
import { Observable, Subscription } from "rxjs";
import { PageEvent } from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{
  isLoading$ : Observable<boolean>;
  postsData$: Observable<{posts: Post[], maxPosts: NumberInput}>;
  currentPage = 1;
  postsPerPage = 6;
  
  constructor( private service: PostsService ){
    [this.postsData$, this.isLoading$] = this.service.getUpdateListener();
    
  }
  ngOnInit(){
    this.service.getPosts(this.postsPerPage, this.currentPage);
    
  }

  onDelete(id: string){
    this.service.deletePost(id);
  }

  onPage(data: PageEvent){
    console.log(data);
    this.postsPerPage = data.pageSize;
    this.currentPage = data.pageIndex + 1;
    this.service.getPosts(this.postsPerPage, this.currentPage);
  }

}
