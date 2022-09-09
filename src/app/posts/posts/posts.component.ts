import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../models';
//import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() posts!: Post[];
  @Input() isLogged: boolean = false;
  @Input() userId: string = '';
  @Output('delete') idEvent = new EventEmitter<string>();
  
  ngOnInit(): void {
  }

  onDelete(postId: string){
    console.log('Deleted '+postId);
    this.idEvent.emit(postId);
    //this.postService.deletePost(postId);
  }

}
