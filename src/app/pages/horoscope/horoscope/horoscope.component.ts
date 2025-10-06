import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SignsBannerComponent } from '../../../components/signs-banner/signs-banner.component';
import { HoroscopeType } from '../../../models/horoscope.model';

@Component({
  selector: 'app-horoscope',
  imports: [SignsBannerComponent],
  templateUrl: './horoscope.component.html',
  styleUrl: './horoscope.component.scss'
})
export class HoroscopeComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  horoscopeType!: HoroscopeType;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.horoscopeType = params.get('type') as HoroscopeType;
    }); 
  }
}
