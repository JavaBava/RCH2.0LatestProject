import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageprofileComponent } from './villageprofile.component';

describe('VillageprofileComponent', () => {
  let component: VillageprofileComponent;
  let fixture: ComponentFixture<VillageprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillageprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
