import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffspringImageComponent } from './offspring-image.component';

describe('OffspringImageComponent', () => {
  let component: OffspringImageComponent;
  let fixture: ComponentFixture<OffspringImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffspringImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffspringImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
