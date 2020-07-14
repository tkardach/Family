import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-progress',
  templateUrl: './file-progress.component.html',
  styleUrls: ['./file-progress.component.css']
})
export class FileProgressComponent implements OnInit {
  @Input() progress = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
