import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Blog, CategoryEnum } from '../model/blog.model';
import { BlogService } from '../service/blog.service';
import { ImageProcessingService } from '../service/image-processing.service';

@Component({
  selector: 'app-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.css']
})
export class BlogsPageComponent implements OnInit{
  
  blogDetails: Blog[] = [];
  displayedColumns: string[] =['Id','Title', 'Category', 'Content', 'Author Name', 'Images', 'Edit', 'Delete']
  categoryEnum: CategoryEnum[] = [CategoryEnum.FASHION, CategoryEnum.FOOD, CategoryEnum.TRAVEL, CategoryEnum.OTHER];

  constructor(private router: Router, 
    private blogService: BlogService, 
    private imageProcessingService: ImageProcessingService) {

  }

  getBlogs() {
    this.blogService.getBlogs()
    .pipe(
      map((x: Blog[], i) => x.map((blog: Blog) => this.imageProcessingService.createImages(blog)))
    )
    .subscribe(
      (resp: Blog[]) => {
        console.log(resp);
        this.blogDetails = resp;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  addBlog(): void {
    this.router.navigate(['/add-blog'])
      .then((e) => {
        if(e) {
          console.log("Navigation to add blog successful!");
        } else {
          console.log("Navigation to add blog failed!")
        }
      });
  };

  deleteBlog(blogId:any) {
    this.blogService.deleteBlog(blogId).subscribe(
      (resp) => {
        this.getBlogs();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(blog: Blog) {
    console.log(blog);
  }

  editBlogDetails(blogId: any) {
    this.router.navigate(['/add-blog', {blogId: blogId}]);
  }

  showBlogDetails(blogId: any) {
    this.router.navigate(['/blog-details', {blogId: blogId}])
  }

  ngOnInit(): void {
    this.getBlogs();
  }

  
}
