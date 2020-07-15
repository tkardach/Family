import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffspringAlbumComponent } from './offspring-album.component';
import { NGXLogger } from 'ngx-logger';

describe('OffspringAlbumComponent', () => {
  let component: OffspringAlbumComponent;
  let fixture: ComponentFixture<OffspringAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffspringAlbumComponent ],
      providers: [
        {provide: NGXLogger, useClass: class {}}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffspringAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
