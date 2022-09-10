import { Injectable } from '@angular/core';
import { Post } from "./models";
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { environment } from "src/environments/environment";
const BACKEND_URL = environment.API_URL + 'posts/';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postCount: number = 5;
  private postsUpdated = new BehaviorSubject<{posts: Post[], maxPosts: any}>(
    {posts: [], maxPosts: 0}
  );
  private isLoading = new BehaviorSubject<boolean>(true);

  //For pagination persistence when instancing new post list
  private displayed: number = 5;
  private page: number = 1;

  constructor(private http: HttpClient, private router: Router) { }

  getUpdateListener(): Array<any>{
    return [this.postsUpdated.asObservable(), this.isLoading.asObservable()];
  }
  
  getPosts(postsPerPage?: number, currentPage?: number) {
    let queryParams = '';
    if (postsPerPage && currentPage){
      queryParams = `?size=${postsPerPage}&page=${currentPage}`;
      this.displayed = postsPerPage;
      this.page = currentPage;
    }
    
    this.isLoading.next(true);
    this.http.get<{message: string, posts: Array<any>, numberPosts: number}>
      (BACKEND_URL+queryParams)
      .pipe(map(postData => {
        return {posts : postData.posts.map(post => {
          return{
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            userId: post.userId ,
          }
        }), number: postData.numberPosts};
      }))
      .subscribe((resPosts) => {
          console.log(resPosts)
          this.posts = resPosts.posts;
          this.postCount = resPosts.number;
          this.isLoading.next(false)
          this.postsUpdated.next({posts: [...this.posts], maxPosts: this.postCount});
        })
  }

  getPost(postId: string): any{
    return this.http.get<any>
    (BACKEND_URL+postId);
  }
  
  addPost(title: string, content: string, image: File|string) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image);
    console.log('image type', image);

    this.http.post<{ message: string, postId: string, imagePath: string }>
      (BACKEND_URL,  postData )
      .subscribe(res => {
        this.router.navigate(['/'], {queryParams: {displayed: this.displayed, page: this.lastPage()}});
      })
  }

  updatePost(postId: string, title: string, content: string, image: string|File){
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image);
    this.http.put<{message: string, imagePath: string}>
    (BACKEND_URL+postId, postData)
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['/'], {queryParams: {displayed: this.displayed, page: this.page}});
    })

  }

  deletePost(postId: string){
    this.http.delete<{ message: string}>
    (BACKEND_URL+ postId)
    .subscribe(res =>{
      console.log(res.message);
      this.posts = this.posts.filter(post => post.id !== postId);
      this.postsUpdated.next({posts: [...this.posts], maxPosts: this.postCount});
    })
  }

  returnList(){
    this.router.navigate(['/'], {queryParams: {displayed: this.displayed, page: this.page}});
  }

  lastPage(){
    console.log('Count: ',this.postCount,'Displayed: ', this.displayed)
    const _aux = (this.postCount)/this.displayed;
    return (_aux | 0)+1;
  }
}
