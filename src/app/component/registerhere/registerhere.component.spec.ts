import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterhereComponent } from './registerhere.component';

describe('RegisterhereComponent', () => {
  let component: RegisterhereComponent;
  let fixture: ComponentFixture<RegisterhereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterhereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
