import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../models';
import { PostsService } from '../posts.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  private subs : Subscription = new Subscription;

  constructor( private service: PostsService ){

  }
  ngOnInit(){
    this.service.getPosts();
    this.subs = this.service.getUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
