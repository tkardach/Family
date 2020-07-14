import { Injectable } from '@angular/core';
import { OffspringAlbumModule } from './offspring-album.module';

export interface Family {
  _id: String,
  name: String,
  birth: Date
}

export interface Category {
  _id: String,
  name: String
}

export interface Media {
  _id: String,
  name: String,
  description: String,
  categories: [Category],
  family: [Family]
}

@Injectable({
  providedIn: OffspringAlbumModule
})
export class OffspringAlbumService {

  constructor() { }
}
