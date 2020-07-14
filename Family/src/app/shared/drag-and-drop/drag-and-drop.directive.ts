import { 
  Directive, 
  HostBinding,
  HostListener,
  Output, 
  EventEmitter } from '@angular/core';


@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  
  counter: number = 0;

  constructor() { }

  @HostListener('dragenter', ['$event']) onDragEnter(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.counter++;
    this.fileOver = true;
  }
  
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.counter--;
    if (this.counter === 0) 
      this.fileOver = false;
  }

  @HostListener('drop', ['$event']) onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
