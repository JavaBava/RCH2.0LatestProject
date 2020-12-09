import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkprofileReportComponent } from './bulkprofile-report.component';

describe('BulkprofileReportComponent', () => {
  let component: BulkprofileReportComponent;
  let fixture: ComponentFixture<BulkprofileReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkprofileReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkprofileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
