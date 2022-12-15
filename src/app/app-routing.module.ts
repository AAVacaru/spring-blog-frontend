import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogResolveService } from './service/blog-resolve.service';

const routes: Routes =[
  {path: 'list-blogs', component: BlogsPageComponent},
  {path: 'add-blog', component: AddBlogComponent, resolve : {blog: BlogResolveService}},
  {path: 'blog-details', component: BlogDetailsComponent, resolve : {blog: BlogResolveService}}
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
