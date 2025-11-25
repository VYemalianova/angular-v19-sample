import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SignsBannerComponent } from '../../../components/signs-banner/signs-banner.component';
import { HoroscopeType } from '../../../models/horoscope.model';

@Component({
  selector: 'app-sign-details',
  imports: [SignsBannerComponent],
  templateUrl: './sign-details.component.html',
  styleUrl: './sign-details.component.scss'
})
export class SignDetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  horoscopeType!: HoroscopeType;

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.horoscopeType = params.get('type') as HoroscopeType;
    }); 
  }
}
