import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAudioComponent } from './content-audio.component';

describe('ContentAudioComponent', () => {
  let component: ContentAudioComponent;
  let fixture: ComponentFixture<ContentAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
