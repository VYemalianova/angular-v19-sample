import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroscopeDetailsComponent } from './horoscope-details.component';

describe('HoroscopeDetailsComponent', () => {
  let component: HoroscopeDetailsComponent;
  let fixture: ComponentFixture<HoroscopeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoroscopeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoroscopeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
