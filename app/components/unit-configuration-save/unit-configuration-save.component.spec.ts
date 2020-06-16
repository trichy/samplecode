/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitConfigurationSaveComponent } from './unit-configuration-save.component';

describe('UnitConfigurationSaveComponent', () => {
  let component: UnitConfigurationSaveComponent;
  let fixture: ComponentFixture<UnitConfigurationSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitConfigurationSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitConfigurationSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
