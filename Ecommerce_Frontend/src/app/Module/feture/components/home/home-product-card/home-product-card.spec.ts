import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductCard } from './home-product-card';

describe('HomeProductCard', () => {
  let component: HomeProductCard;
  let fixture: ComponentFixture<HomeProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeProductCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
