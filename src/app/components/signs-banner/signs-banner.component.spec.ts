import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignsBannerComponent } from './signs-banner.component';

describe('SignsBannerComponent', () => {
  let component: SignsBannerComponent;
  let fixture: ComponentFixture<SignsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignsBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
