/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FanRatingModalComponent } from './fan-rating-modal.component';

describe('FanRatingModalComponent', () => {
  let component: FanRatingModalComponent;
  let fixture: ComponentFixture<FanRatingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanRatingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanRatingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
