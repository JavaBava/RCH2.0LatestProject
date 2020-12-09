import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmregistrationComponent } from './confirmregistration.component';

describe('ConfirmregistrationComponent', () => {
  let component: ConfirmregistrationComponent;
  let fixture: ComponentFixture<ConfirmregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmregistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
