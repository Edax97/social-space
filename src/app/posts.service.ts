import { Injectable } from '@angular/core';
import { Post } from "./models";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts : Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) {  }
  getPosts(){
    this.http.get<{message: string, posts: Post[]}>
      ('http://localhost:3000/api/posts')
      .subscribe(resData =>{
        console.log(resData)
        this.posts = resData.posts;
        this.postsUpdated.next([...this.posts]);
      })
    
  }
  getUpdateListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content:string){
    const post = {id: '',title: title, content: content}
    this.http.post<{message: string}>
    ('http://localhost:3000/api/posts', {post: post})
      .subscribe(mes => {
        console.log(mes.message)
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })

    
  }
}
