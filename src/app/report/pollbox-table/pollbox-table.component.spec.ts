import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollboxTableComponent } from './pollbox-table.component';

describe('PollboxTableComponent', () => {
  let component: PollboxTableComponent;
  let fixture: ComponentFixture<PollboxTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollboxTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollboxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
