import { Component, OnInit, ViewChild } from '@angular/core';
import { DragAndDropComponent } from 'src/app/shared/drag-and-drop/drag-and-drop.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild(DragAndDropComponent) dndChild:DragAndDropComponent;

  url:string;
  allowedTypes:string[];

  constructor() { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dndChild.initializeUploader(environment.imageAndVideoUploadURL, environment.imageAndVideoAllowedTypes);
  }
}
