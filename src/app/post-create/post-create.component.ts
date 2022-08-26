import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreate{

  constructor(private service: PostsService){};

  onCreatePost( form: NgForm ): void{
    if (form.invalid){return;}
    this.service.addPost(form.value.title, form.value.content);
  }
}
