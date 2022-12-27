import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/model/blog.model';
import { Comment } from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogUrl = 'http://localhost:8080/blog-service/blogs';
  private searchUrl = 'http://localhost:8082/search-service';
  private commentUrl = 'http://localhost:8081/comment-service/blogs';


  constructor(private http: HttpClient) { }

  public getBlogs() {
    return this.http.get<Blog[]>(`${this.blogUrl}`);
  }

  public addBlog(blog: FormData) {
    return this.http.post<Blog>(`${this.blogUrl}`, blog);
  }

  public deleteBlog(blogId: number) {
    return this.http.delete(`${this.blogUrl}` + `/` + blogId);
  }

  public getBlogById(blogId: any) {
    return this.http.get<Blog>(`${this.blogUrl}` + `/` + blogId)
  }

  public addComment(comment: Comment, blogId: any) {
    return this.http.post<Comment>(`${this.commentUrl}` + '/' + blogId + "/comments", comment);
  }

  public deleteComment(commentId: any) {
    return this.http.delete(`${this.commentUrl}` + `/` + commentId);
  }

  public searchBlogByKeyword(keyword:string){
    return this.http.get<Blog[]>(`${this.searchUrl}` + `?searchKey=` + keyword);
  }

 }
