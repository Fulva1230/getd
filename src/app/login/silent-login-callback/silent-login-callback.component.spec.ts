import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilentLoginCallbackComponent } from './silent-login-callback.component';

describe('SilentLoginCallbackComponent', () => {
  let component: SilentLoginCallbackComponent;
  let fixture: ComponentFixture<SilentLoginCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SilentLoginCallbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SilentLoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
