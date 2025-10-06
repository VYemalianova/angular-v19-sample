import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  horoscopeType!: HoroscopeType;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.horoscopeType = params.get('type') as HoroscopeType;
    }); 
  }
}
