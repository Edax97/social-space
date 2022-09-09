import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PostCreate } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreate, canActivate: [AuthGuard]},
  {path: 'edit/:postId', component: PostCreate, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'create'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
