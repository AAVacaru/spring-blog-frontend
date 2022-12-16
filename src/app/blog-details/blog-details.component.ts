import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../model/blog.model';
import { Comment } from '../model/comment.model';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{

  blog!: Blog;
  comment: Comment = {
    commentId: null,
    content: "",
    authorName: "",
    date: "",
    blogId: null
  }
  selectedBlogIndex = 0;

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blog = this.activatedRoute.snapshot.data['blog'];
    console.log(this.blog);
  }

  deleteBlog(blogId:any) {
    this.blogService.deleteBlog(blogId).subscribe(
      (resp) => {
        this.router.navigate(['/blogs-page'])
      .then((e) => {
        if(e) {
          console.log("Navigation to add blog successful!");
        } else {
          console.log("Navigation to add blog failed!")
        }
      });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  editBlogDetails(blogId: any) {
    this.router.navigate(['/add-blog', {blogId: blogId}]);
  }

  showPictures() {
    if(this.blog.pictures != null && this.blog.pictures.length != 0) {
      return true;
    }
    return false; 
  }

  changeIndex(i: any) {
    this.selectedBlogIndex = i;
  }

  addComment(commentForm: NgForm, blogId: any) {
      this.blogService.addComment(this.comment, blogId).subscribe(
        (response: Comment) => {
          console.log(response);
          commentForm.reset();
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  deleteComment(commentId: any) {
    this.blogService.deleteComment(commentId).subscribe(
      (resp) => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
