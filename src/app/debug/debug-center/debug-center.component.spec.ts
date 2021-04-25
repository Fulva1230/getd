import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugCenterComponent } from './debug-center.component';

describe('DebugCenterComponent', () => {
  let component: DebugCenterComponent;
  let fixture: ComponentFixture<DebugCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebugCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
