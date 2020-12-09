import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPncComponent } from './child-pnc.component';

describe('ChildPncComponent', () => {
  let component: ChildPncComponent;
  let fixture: ComponentFixture<ChildPncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildPncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildPncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
