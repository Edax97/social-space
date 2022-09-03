import { Injectable } from '@angular/core';
import { Post } from "./models";
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private maxPosts: Number = 0;
  private postsUpdated = new BehaviorSubject<{posts: Post[], maxPosts: any}>(
    {posts: [], maxPosts: 0}
  );
  private isLoading = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private router: Router) { }
  getPosts(postsPerPage?: number, currentPage?: number) {
    let queryParams = '';
    if (postsPerPage && currentPage){queryParams = `?size=${postsPerPage}&page=${currentPage}`}
    
    this.isLoading.next(true);
    this.http.get<{message: string, posts: Array<any>, numberPosts: Number}>
      ('http://localhost:3000/api/posts/'+queryParams)
      .pipe(map(postData => {
        return {posts : postData.posts.map(post => {
          return{
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath ?? ''
          }
        }), number: postData.numberPosts};
      }))
      .subscribe((resPosts) => {
          console.log(resPosts)
          this.posts = resPosts.posts;
          this.maxPosts = resPosts.number;
          this.isLoading.next(false)
          this.postsUpdated.next({posts: [...this.posts], maxPosts: this.maxPosts});
        })
  }
  getPost(postId: string): any{
    return this.http.get<any>
    ('http://localhost:3000/api/posts/'+postId);
  }
  getUpdateListener(): Array<any>{
    return [this.postsUpdated.asObservable(), this.isLoading.asObservable()];
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
      this.router.navigate(['/']);

    })

  }
  deletePost(postId: string){
    this.http.delete<{ message: string}>
    (`http://localhost:3000/api/posts/${ postId }`)
    .subscribe(res =>{
      console.log(res.message);
      this.posts = this.posts.filter(post => post.id !== postId);
      this.postsUpdated.next({posts: [...this.posts], maxPosts: this.maxPosts});
    })
  }
}
