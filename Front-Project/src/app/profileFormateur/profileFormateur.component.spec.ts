import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormateurComponent } from './profileFormateur.component';

describe('ProfileFormateurComponent', () => {
  let component: ProfileFormateurComponent;
  let fixture: ComponentFixture<ProfileFormateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFormateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
