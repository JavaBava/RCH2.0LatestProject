import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserapprovalComponent } from './userapproval.component';

describe('UserapprovalComponent', () => {
  let component: UserapprovalComponent;
  let fixture: ComponentFixture<UserapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserapprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
