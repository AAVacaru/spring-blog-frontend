import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './drag.directive'
import { MatTableModule } from '@angular/material/table' 
import {MatIconModule} from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddBlogComponent,
    BlogsPageComponent,
    DragDirective,
    BlogDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    NgbModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
