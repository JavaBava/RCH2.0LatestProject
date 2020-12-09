import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBootstrapModalComponent } from './ngx-bootstrap-modal.component';

describe('NgxBootstrapModalComponent', () => {
  let component: NgxBootstrapModalComponent;
  let fixture: ComponentFixture<NgxBootstrapModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxBootstrapModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
