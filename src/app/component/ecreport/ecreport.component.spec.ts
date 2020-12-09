import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECReportComponent } from './ecreport.component';

describe('ECReportComponent', () => {
  let component: ECReportComponent;
  let fixture: ComponentFixture<ECReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
