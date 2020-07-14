import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffspringAlbumComponent } from './offspring-album/offspring-album.component';
import { OffspringImageComponent } from './offspring-image/offspring-image.component';



@NgModule({
  declarations: [
    OffspringAlbumComponent,
    OffspringImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OffspringAlbumComponent
  ]
})
export class OffspringAlbumModule { }
