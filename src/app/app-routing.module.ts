import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';

const routes: Routes =[
  {path: 'list-blogs', component: BlogsPageComponent},
  {path: 'add-blog', component: AddBlogComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
