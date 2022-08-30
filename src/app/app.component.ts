import { Component, ViewEncapsulation } from '@angular/core';
import { Post } from './models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  storedPosts: Post[] = [];
  onAddPost(post: Post){
    this.storedPosts.push(post);
  }
}
