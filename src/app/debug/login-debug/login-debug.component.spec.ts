import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDebugComponent } from './login-debug.component';

describe('LoginDebugComponent', () => {
  let component: LoginDebugComponent;
  let fixture: ComponentFixture<LoginDebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDebugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
