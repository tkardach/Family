import { TestBed } from '@angular/core/testing';

import { OffspringAlbumService } from './offspring-album.service';
import { NGXLogger } from 'ngx-logger';

describe('OffspringAlbumService', () => {
  let service: OffspringAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NGXLogger, useClass: class {}},
        OffspringAlbumService
      ]
    });

    service = TestBed.inject(OffspringAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
