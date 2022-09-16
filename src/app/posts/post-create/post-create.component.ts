import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreate implements OnInit{
  form: FormGroup;
  imagePreview = '';
  isLoading = false;
  public mode = '';
  private postId: string = 'null';

  constructor(private service: PostsService, private route: ActivatedRoute){};

  ngOnInit(){
    //Initializing form
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]}),
      content: new FormControl(''),
      image: new FormControl(null, {asyncValidators: [mimeType]})
    });
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
                this.form.setValue({
                  title: response.title,
                  content: response.content,
                  image: response.imagePath
                })
                this.isLoading = false;
                this.imagePreview = response.imagePath;
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
        this.imagePreview = '';
      }
    });
  }

  private imageToUrl(f: File){
    console.log('reading file')
    if (this.form.get('image').invalid){return;}
    const reader = new FileReader();
    reader.onload= ()=>{
      this.imagePreview = reader.result as string;
    };
    if (f){ reader.readAsDataURL(f);}
  }
  onFileSelected(event: Event): void{
    const file = (event.target as HTMLInputElement).files[0];
    console.log('File',file);
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    this.imageToUrl(file);
  }

  onSavePost(): void{
    if (this.form.invalid){return;}
    this.isLoading = true;
    if (this.mode === 'create') {
      this.service.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else{
      this.service.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }  
    this.form.reset();
  }

  onCancel(): void{
    this.isLoading = true;
    this.service.returnList();
  }

  onCancelImage(): void{
    this.form.patchValue({image: ''});
    this.imagePreview = '';
  }
}
