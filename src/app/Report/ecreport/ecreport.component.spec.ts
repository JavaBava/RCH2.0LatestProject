import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcreportComponent } from './ecreport.component';

describe('EcreportComponent', () => {
  let component: EcreportComponent;
  let fixture: ComponentFixture<EcreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
