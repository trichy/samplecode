import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSegmentModelComponent } from './delete-segment-model.component';

describe('DeleteSegmentModelComponent', () => {
  let component: DeleteSegmentModelComponent;
  let fixture: ComponentFixture<DeleteSegmentModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSegmentModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSegmentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
