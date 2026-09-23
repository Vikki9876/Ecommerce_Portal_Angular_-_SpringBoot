import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavContent } from './nav-content';

describe('NavContent', () => {
  let component: NavContent;
  let fixture: ComponentFixture<NavContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavContent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
