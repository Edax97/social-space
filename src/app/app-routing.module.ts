import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreate } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreate},
  {path: 'edit/:postId', component: PostCreate},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
