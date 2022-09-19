import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { Post } from '../models';
import { PostsService } from '../posts.service';

@Component({
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  profileId : string|undefined;
  userId$: Observable<string>;
  postsData$: Observable<{posts: Post[], maxPosts: NumberInput}>;
  currentPage = 1;
  postsPerPage = 5;

  constructor( private postService: PostsService, private authService: AuthService, 
    private route: ActivatedRoute, private profileSer: ProfileService ) { 
    [this.postsData$, this.isLoading$] = this.postService.getUpdateListener();
    this.userId$ = this.authService.getIdListener();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.profileId = params.get('profile');
      this.queryHandling(this.profileId);
    })
  }

  queryHandling(profileId: string){
    this.route.queryParamMap.subscribe(params => {
      if (params.has('page')){
        console.log('Page: ', params.get('page'));
        this.currentPage = +params.get('page');
      }
      else if (params.has('displayed')){
        this.postsPerPage = +params.get('displayed');
        console.log('Displayed', this.postsPerPage)
      }
      else{
        this.currentPage = 1;
      }
      console.log(this.currentPage, this.postsPerPage)
      this.postService.getProfilePosts(profileId, this.postsPerPage, this.currentPage)
    })
  }

  onPage(data: PageEvent){
    console.log(data);
    this.postsPerPage = data.pageSize;
    this.currentPage = data.pageIndex + 1;
    this.postService.getProfilePosts(this.profileId, this.postsPerPage, this.currentPage);
  }

  onFollow(accountId: string){
    this.profileSer.follow(accountId);
  }

}
