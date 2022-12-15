import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Blog, CategoryEnum } from '../model/blog.model';
import { BlogService } from './blog.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BlogResolveService implements Resolve<Blog>{

  constructor(private blogService: BlogService,
    private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Blog> {
    const id = route.paramMap.get("blogId");

    if(id) {
      return this.blogService.getBlogById(id)
      .pipe(
        map(p => this.imageProcessingService.createImages(p))
      );

    } else {
        return of(this.getBlogDetails());
    }
  }

  getBlogDetails() {
    return {
        blogId: null,
        title: "",
        content: "",
        date: "",
        category: CategoryEnum.OTHER,
        authorName: "",
        pictures: []
    }
  }
  
}
