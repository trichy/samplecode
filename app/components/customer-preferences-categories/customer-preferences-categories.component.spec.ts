/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerPreferencesCategoriesComponent } from './customer-preferences-categories.component';

describe('CustomerPreferencesCategoriesComponent', () => {
  let component: CustomerPreferencesCategoriesComponent;
  let fixture: ComponentFixture<CustomerPreferencesCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPreferencesCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPreferencesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
