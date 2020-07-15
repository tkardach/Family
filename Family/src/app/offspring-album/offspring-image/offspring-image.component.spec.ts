import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffspringImageComponent } from './offspring-image.component';
import { NGXLogger } from 'ngx-logger';

describe('OffspringImageComponent', () => {
  let component: OffspringImageComponent;
  let fixture: ComponentFixture<OffspringImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NGXLogger, useClass: class {}}
      ],
      declarations: [ OffspringImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffspringImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
