import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = 'http://localhost:8080/blog-service/blogs';

  constructor(private http: HttpClient) { }

  public getBlogs() {
    return this.http.get<Blog[]>(`${this.url}`);
  }

  public addBlog(blog: FormData) {
    return this.http.post<Blog>(`${this.url}`, blog);
  }

  public deleteBlog(blogId: number) {
    return this.http.delete(`${this.url}` + `/` + blogId);
  }


 }
