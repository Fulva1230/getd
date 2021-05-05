import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeterminesChartComponent } from './determines-chart.component';

describe('DeterminesChartComponent', () => {
  let component: DeterminesChartComponent;
  let fixture: ComponentFixture<DeterminesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeterminesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeterminesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
