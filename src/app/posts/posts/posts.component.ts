import { isNgTemplate } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../models';
import { PostsService } from '../posts.service';
//import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() posts!: Post[];
  @Input() userId: string = '';

  constructor(private service: PostsService){}
  
  ngOnInit(): void {
  }

  onUpvote(postId: string, userId: string) {
    this.service.likePost(postId, userId);
  }

  onDelete(postId: string){
    this.service.deletePost(postId);
  }

  identical(index, item){
    return item.id;
  }

}
