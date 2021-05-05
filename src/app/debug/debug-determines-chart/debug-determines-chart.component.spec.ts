import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugDeterminesChartComponent } from './debug-determines-chart.component';

describe('DebugDeterminesChartComponent', () => {
  let component: DebugDeterminesChartComponent;
  let fixture: ComponentFixture<DebugDeterminesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebugDeterminesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugDeterminesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
