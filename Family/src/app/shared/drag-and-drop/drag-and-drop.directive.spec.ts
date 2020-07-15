import { DragAndDropDirective } from './drag-and-drop.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NGXLogger } from 'ngx-logger';
import { Component, HostListener, DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

// Simple test component that will not in the actual app
@Component({
  template: '<p id="test" appDragAndDrop>Testing Drag and Drop Directive</p>'
})
class TestComponent {
  dragOverCount:number = 0;
  dragLeaveCount:number = 0;
  dragEnterCount:number = 0;
  dragDropCount:number = 0;

  constructor() { }

  @HostListener('dragenter') 
  onDragEnter() {
    this.dragEnterCount++;
  }
  
  @HostListener('dragover') 
  onDragOver() {
    this.dragOverCount++;
  }

  @HostListener('dragleave') 
  onDragLeave() {
    this.dragLeaveCount++;
  }

  @HostListener('drop') 
  onDrop() {
    this.dragDropCount++;
  }
}

describe('DragAndDropDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let pEl: DebugElement;
  let directiveEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NGXLogger, useClass: class {}}
      ],
      declarations: [
        DragAndDropDirective,
        TestComponent
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;  

    directiveEl = fixture.debugElement.query(By.directive(DragAndDropDirective));
    pEl = fixture.debugElement.query(By.css('p'))
  })

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('should add fileover class to tag on dragOver', () => {
    expect(pEl.classes.fileover).toBeFalsy();

    pEl.triggerEventHandler('dragenter', new DragEvent('dragenter', null));
    fixture.detectChanges();

    expect(pEl.classes.fileover).toBeTruthy();
  });

  it('should remove fileover class from tag on dragLeave', () => {
    expect(pEl.classes.fileover).toBeFalsy();

    pEl.triggerEventHandler('dragenter', new DragEvent('dragenter', null));
    fixture.detectChanges();

    expect(pEl.classes.fileover).toBeTruthy();

    pEl.triggerEventHandler('dragleave', new DragEvent('dragleave', null));
    fixture.detectChanges();

    expect(pEl.classes.fileover).toBeFalsy();
  });

  it('should not be affected by dragover, only dragenter', () => {
    expect(pEl.classes.fileover).toBeFalsy();

    pEl.triggerEventHandler('dragenter', new DragEvent('dragenter', null));
    fixture.detectChanges();

    expect(pEl.classes.fileover).toBeTruthy();

    pEl.triggerEventHandler('dragover', new DragEvent('dragover', null));
    fixture.detectChanges();
    pEl.triggerEventHandler('dragover', new DragEvent('dragover', null));
    fixture.detectChanges();
    
    expect(pEl.classes.fileover).toBeTruthy();

    pEl.triggerEventHandler('dragleave', new DragEvent('dragleave', null));
    fixture.detectChanges();
    
    expect(pEl.classes.fileover).toBeFalsy();
  });
});
