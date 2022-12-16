import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Blog, CategoryEnum } from 'src/app/model/blog.model';
import { FileHandle } from 'src/app/model/file-handle.model';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit{

  constructor(private blogService: BlogService, private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) {}

  isNewBlog = true;

  blog: Blog = {
    blogId: null,
    title: "",
    content: "",
    date: "",
    category: CategoryEnum.OTHER,
    authorName: "",
    pictures: [],
    comments: [],
  }

  ngOnInit(): void {
    this.blog = this.activatedRoute.snapshot.data['blog'];
    if(this.blog && this.blog.blogId) {
        this.isNewBlog = false;
    }
  }

  addBlog(blogForm: NgForm) {
    
    const blogFormData = this.prepareFormData(this.blog);

    this.blogService.addBlog(blogFormData).subscribe(
      (response: Blog) => {
        console.log(response);
        blogForm.reset();
        this.blog.pictures = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(blog: Blog): FormData {
    const formData = new FormData();
    formData.append(
      'blog',
      new Blob([JSON.stringify(blog)], {type: 'application/json'})
    );

    for(var i = 0; i < blog.pictures.length; i++) {
      formData.append(
        'imageFile',
        blog.pictures[i].file,
        blog.pictures[i].file.name
      );
    }

    return formData;

  }

  onFileSelected(event: any) {
    if(event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      this.blog.pictures.push(fileHandle);

    }
  }

  removeImages(i: number) {
    this.blog.pictures.splice(i, 1)
  }

  fileDropped(fileHandle: FileHandle) {
    this.blog.pictures.push(fileHandle);
  }

  
}
