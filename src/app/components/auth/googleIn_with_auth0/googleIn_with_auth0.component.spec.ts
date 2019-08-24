/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GoogleIn_with_auth0Component } from './googleIn_with_auth0.component';

describe('GoogleIn_with_auth0Component', () => {
  let component: GoogleIn_with_auth0Component;
  let fixture: ComponentFixture<GoogleIn_with_auth0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleIn_with_auth0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleIn_with_auth0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
