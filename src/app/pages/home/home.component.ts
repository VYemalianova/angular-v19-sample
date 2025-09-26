import { Component, effect, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private aboutUsSection = viewChild<ElementRef<HTMLDivElement>>('aboutUsSection');

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
