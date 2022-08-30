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
  isLoading = false;
  posts: Post[] = [];
  private subs : Subscription = new Subscription;

  constructor( private service: PostsService ){

  }
  ngOnInit(){
    this.isLoading = true;
    this.service.getPosts();
    this.subs = this.service.getUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
  }

  onDelete(postId: string){
    console.log('Deleted '+postId)
    this.service.deletePost(postId);
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }


}
