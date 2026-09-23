import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewCard } from './product-review-card';

describe('ProductReviewCard', () => {
  let component: ProductReviewCard;
  let fixture: ComponentFixture<ProductReviewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductReviewCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductReviewCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
