import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustchangepasswordComponent } from './mustchangepassword.component';

describe('MustchangepasswordComponent', () => {
  let component: MustchangepasswordComponent;
  let fixture: ComponentFixture<MustchangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MustchangepasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MustchangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
