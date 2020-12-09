import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EctrackComponent } from './ectrack.component';

describe('EctrackComponent', () => {
  let component: EctrackComponent;
  let fixture: ComponentFixture<EctrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EctrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EctrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
