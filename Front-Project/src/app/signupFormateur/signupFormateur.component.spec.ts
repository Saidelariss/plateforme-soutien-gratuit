import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormateurComponent } from './signupFormateur.component';

describe('SignupFormateurComponent', () => {
  let component: SignupFormateurComponent;
  let fixture: ComponentFixture<SignupFormateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupFormateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
