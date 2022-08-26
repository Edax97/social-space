import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Post } from '../models';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreate{

  enteredTitle: string = '';
  enteredContent: string = '';

  @Output() createdNew = new EventEmitter<Post>();

  onCreatePost( form: NgForm ): void{
    if (form.invalid){return;}
    const post: Post = {title: form.value.title, content: form.value.content};
    this.createdNew.emit(post);
    this.enteredTitle, this.enteredContent = '','';
  }
}
