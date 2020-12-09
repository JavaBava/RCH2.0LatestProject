import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EctrackingComponent } from './ectracking.component';

describe('EctrackingComponent', () => {
  let component: EctrackingComponent;
  let fixture: ComponentFixture<EctrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EctrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EctrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
