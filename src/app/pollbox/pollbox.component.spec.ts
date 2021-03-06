import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollboxComponent } from './pollbox.component';

describe('PollboxComponent', () => {
  let component: PollboxComponent;
  let fixture: ComponentFixture<PollboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
