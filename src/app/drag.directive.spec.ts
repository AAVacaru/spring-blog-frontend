import { DomSanitizer } from '@angular/platform-browser';
import { DragDirective } from './drag.directive';

var domSanitizer: DomSanitizer;
describe('DragDirective', () => {
  
  it('should create an instance', () => {
    const directive = new DragDirective(domSanitizer);
    expect(directive).toBeTruthy();
  });
});
