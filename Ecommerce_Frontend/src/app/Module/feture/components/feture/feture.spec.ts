import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feture } from './feture';

describe('Feture', () => {
  let component: Feture;
  let fixture: ComponentFixture<Feture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feture],
    }).compileComponents();

    fixture = TestBed.createComponent(Feture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
