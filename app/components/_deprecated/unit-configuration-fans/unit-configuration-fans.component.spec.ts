/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitConfigurationFansComponent } from './unit-configuration-fans.component';

describe('UnitConfigurationFansComponent', () => {
  let component: UnitConfigurationFansComponent;
  let fixture: ComponentFixture<UnitConfigurationFansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitConfigurationFansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitConfigurationFansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
