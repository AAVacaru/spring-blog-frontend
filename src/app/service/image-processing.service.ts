import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Blog } from '../model/blog.model';
import { FileHandle } from '../model/file-handle.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(blog: Blog) {
    const pictures: any[] = blog.pictures;

    const blogPicturesToFileHandle: FileHandle[] = [];

    for(let i = 0; i < pictures.length; i++) {
      const pictureFileData = pictures[i];
      const pictureBlob = this.dataURItoBlob(pictureFileData.picByte, pictureFileData.type);
      const pictureFile = new File([pictureBlob], pictureFileData.name, {type: pictureFileData.type});

      const finalFileHandle: FileHandle = {
        file: pictureFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(pictureFile))
      };
      blogPicturesToFileHandle.push(finalFileHandle);
    }

    blog.pictures = blogPicturesToFileHandle;
    return blog;
  }

  public dataURItoBlob(picBytes: string, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType});
    return blob;
  }

}
