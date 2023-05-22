import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileApprentiComponent } from './profileApprenti.component';

describe('ProfileApprentiComponent', () => {
  let component: ProfileApprentiComponent;
  let fixture: ComponentFixture<ProfileApprentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileApprentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileApprentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
