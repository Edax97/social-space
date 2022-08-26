import { Component, OnInit, Input, Output } from '@angular/core';
import { Post } from '../models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent{
  @Input() posts!: Post[] | undefined;
}
