import { Injectable } from '@angular/core';
import { Post } from "./models";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) { }
  getPosts() {
    this.http
      .get<{message: string, posts: Array<any>}>
      ('http://localhost:3000/api/posts')
      .pipe(map(postData => {
        return postData.posts.map(post => {
          return{
            title: post.title,
            content: post.content,
            id: post._id
          }
        });
      }))
      .subscribe((resPosts) => {
          console.log(resPosts)
          this.posts = resPosts;
          this.postsUpdated.next([...this.posts]);
        })
    
  }
  getUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string) {
    const post: Post = {id: 'notset', title: title, content: content }
    this.http.post<{ message: string, postId: string }>
      ('http://localhost:3000/api/posts', { post: post })
      .subscribe(res => {
        post.id = res.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
  }
  deletePost(postId: string){
    this.http.delete<{ message: string}>
    (`http://localhost:3000/api/posts/${ postId }`)
    .subscribe(res =>{
      console.log(res.message);
      this.posts = this.posts.filter(post => post.id !== postId);
      this.postsUpdated.next([...this.posts]);
    })
  }
}
