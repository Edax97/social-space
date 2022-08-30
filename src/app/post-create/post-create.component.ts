import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post} from '../models';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreate implements OnInit{
  isLoading = false;
  public mode = '';
  private postId: string = 'null';
  currentPost: Post = {id: '', title: '', content: ''};

  constructor(private service: PostsService, private route: ActivatedRoute){};

  ngOnInit(){
    //Rendering of component
    this.route.paramMap.subscribe((params) => {
      if (params.has('postId')){
        this.mode = 'edit';
        this.postId = params.get('postId') ?? 'null';
        this.isLoading = true;
        if (this.postId !== 'null'){
          this.service.getPost(this.postId)
            .subscribe(
              (response: any) => {
                this.currentPost = {
                  id: response._id,
                  title: response.title,
                  content: response.content
                };
                this.isLoading = false;
              },
              (response: {message: string}) => {
                this.mode = 'notFound';
                this.isLoading = false;
              }
            );
        }
      } else{
        this.mode = 'create';
        this.postId = 'null';
        this.currentPost = {id: '', title: '', content: ''}; 
      }
    });
  }

  onSavePost( form: NgForm ): void{
    if (form.invalid){return;}
    this.isLoading = true;
    if (this.mode === 'create') {
      this.service.addPost(form.value.title, form.value.content);
    } else{
      this.service.updatePost(this.postId, form.value.title, form.value.content);
    }  
    form.resetForm();
  }
}
