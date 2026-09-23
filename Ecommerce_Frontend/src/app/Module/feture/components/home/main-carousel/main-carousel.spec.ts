import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCarousel } from './main-carousel';

describe('MainCarousel', () => {
  let component: MainCarousel;
  let fixture: ComponentFixture<MainCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(MainCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
