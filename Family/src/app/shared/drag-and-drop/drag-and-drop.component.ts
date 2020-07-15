import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  
  files: any[] = [];
  uploader:FileUploader;

  
  constructor(private logger: NGXLogger) {}

  ngOnInit(): void {
  }

  initializeUploader(url:string, allowedTypes:string[]) {
    this.uploader = new FileUploader({
      url: url,
      allowedFileType: allowedTypes
    })

    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.logger.log('File uploaded successfully', item);
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const error = {
      error: response,
      status: status,
      file: item
    }
    this.logger.error('Failed to upload file', error);
  }

  /**
   * Handles files dropped event
   * @param $event File dropped event
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * Handles files chosen through browser
   * @param files List of files chosen
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Prepare the given list of files for upload
   * @param files List of files to be uploaded
   */
  prepareFilesList(files: Array<any>) {
    this.uploader.addToQueue(files);
    this.fileDropEl.nativeElement.value = "";
    this.uploader.uploadAll();
  }

  /**
   * Format the bytes to generate and display the file size
   * @param bytes Size of the file in bytes
   * @param decimals Number of decimal places to display
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
