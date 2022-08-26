import { Injectable } from '@angular/core';
import { Post } from "./models";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts : Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor() {  }
  getPosts(){
    return [...this.posts];
  }
  getUpdateListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content:string){
    this.posts.push({title: title, content: content});
    this.postsUpdated.next([...this.posts]);
  }
}
