import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkingPolicyComponent } from './linking-policy.component';

describe('LinkingPolicyComponent', () => {
  let component: LinkingPolicyComponent;
  let fixture: ComponentFixture<LinkingPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkingPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
