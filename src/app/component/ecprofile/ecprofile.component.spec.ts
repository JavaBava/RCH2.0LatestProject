import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcprofileComponent } from './ecprofile.component';

describe('EcprofileComponent', () => {
  let component: EcprofileComponent;
  let fixture: ComponentFixture<EcprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
