import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offspring-image',
  templateUrl: './offspring-image.component.html',
  styleUrls: ['./offspring-image.component.css']
})
export class OffspringImageComponent implements OnInit {
  url: String;
  description: String;

  constructor() {
    this.url = "https://i.kym-cdn.com/entries/icons/original/000/013/564/doge.jpg";
    this.description = "Bubba";
   }

  ngOnInit(): void {
  }

}
