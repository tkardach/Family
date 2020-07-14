import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { DragAndDropDirective } from './drag-and-drop/drag-and-drop.directive';
import { FileProgressComponent } from './drag-and-drop/file-progress/file-progress.component';



@NgModule({
  declarations: [
    DragAndDropComponent,
    DragAndDropDirective,
    FileProgressComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DragAndDropComponent
  ]
})
export class SharedModule { }
