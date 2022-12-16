import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/model/blog.model';
import { Comment } from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = 'http://localhost:8080/blog-service/blogs';
  private commentUrl = 'http://localhost:8081/comment-service/blogs';

  constructor(private http: HttpClient) { }

  public getBlogs() {
    return this.http.get<Blog[]>(`${this.url}`);
  }

  public addBlog(blog: FormData) {
    return this.http.post<Blog>(`${this.url}`, blog);
  }

  public deleteBlog(blogId: any) {
    return this.http.delete(`${this.url}` + `/` + blogId);
  }

  public getBlogById(blogId: any) {
    return this.http.get<Blog>(`${this.url}` + `/` + blogId)
  }

  public addComment(comment: Comment, blogId: any) {
    return this.http.post<Comment>(`${this.commentUrl}` + '/' + blogId + "/comments", comment);
  }

  public deleteComment(commentId: any) {
    return this.http.delete(`${this.commentUrl}` + `/` + commentId);
  }

 }
