import { Injectable } from '@angular/core';
import { Post } from "./models";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient, private router: Router) { }
  getPosts() {
    this.http
      .get<{message: string, posts: Array<any>}>
      ('http://localhost:3000/api/posts')
      .pipe(map(postData => {
        return postData.posts.map(post => {
          return{
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath ?? ''
          }
        });
      }))
      .subscribe((resPosts) => {
          console.log(resPosts)
          this.posts = resPosts;
          this.postsUpdated.next([...this.posts]);
        })
  }
  getPost(postId: string): any{
    return this.http.get<any>
    ('http://localhost:3000/api/posts/'+postId);
  }
  getUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  
  addPost(title: string, content: string, image: File|string) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image);
    console.log('image type', image);

    this.http.post<{ message: string, postId: string, imagePath: string }>
      ('http://localhost:3000/api/posts',  postData )
      .subscribe(res => {
        const post: Post = {id: res.postId, title: title, content: content, imagePath: res.imagePath }
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      })
  }
  updatePost(postId: string, title: string, content: string, image: string|File){
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image);
    this.http.put<{message: string, imagePath: string}>
    ('http://localhost:3000/api/posts/'+postId, postData)
    .subscribe(res => {
      console.log(res.message);
      const index = this.posts.findIndex(p => p.id === postId);
      const post: Post = {id: postId, title: title, content: content, imagePath: res.imagePath};
      this.posts[index] = post;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);

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
