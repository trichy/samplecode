/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecificationComponent } from './specification.component';

describe('ProjectScheduleComponent', () => {
    let component: SpecificationComponent;
    let fixture: ComponentFixture<SpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [SpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(SpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
