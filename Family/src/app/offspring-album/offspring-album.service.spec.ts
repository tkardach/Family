import { TestBed } from '@angular/core/testing';

import { OffspringAlbumService } from './offspring-album.service';

describe('OffspringAlbumService', () => {
  let service: OffspringAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffspringAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
