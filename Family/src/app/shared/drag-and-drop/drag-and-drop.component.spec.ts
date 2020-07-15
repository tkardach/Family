import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropComponent } from './drag-and-drop.component';
import { NGXLogger } from 'ngx-logger';

describe('DragAndDropComponent', () => {
  let component: DragAndDropComponent;
  let fixture: ComponentFixture<DragAndDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragAndDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NGXLogger, useClass: class {}}
      ],
      declarations: [DragAndDropComponent]
    });

    fixture = TestBed.createComponent(DragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
