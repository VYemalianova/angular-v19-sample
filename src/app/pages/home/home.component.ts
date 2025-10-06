import { Component, effect, ElementRef, viewChild } from '@angular/core';

import { SignsBannerComponent } from '../../components/signs-banner/signs-banner.component';
import { HoroscopeType } from '../../models/horoscope.model';

@Component({
  selector: 'app-home',
  imports: [SignsBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private aboutUsSection = viewChild<ElementRef<HTMLDivElement>>('aboutUsSection');
  
  readonly HoroscopeType = HoroscopeType;

  constructor() {
    effect(() => {
      const content = this.aboutUsSection();
      const scrollTo = history.state.scrollTo;

      if (content && scrollTo === 'about-us') {
        content.nativeElement.scrollIntoView({ behavior: 'smooth' });
        history.replaceState({}, '');
      }
    });
  }
}
