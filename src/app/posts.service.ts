import { Injectable } from '@angular/core';
import { Post } from "./models";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts : Post[] = [];
  constructor() {  }
  getPosts(){
    return [...this.posts];
  }
  addPost(title: string, content:string){
    this.posts.push({title: title, content: content});
  }
}
