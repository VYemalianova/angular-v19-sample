import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);

  horoscopeType!: HoroscopeType;

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef),).subscribe(params => {
      this.horoscopeType = params.get('type') as HoroscopeType;
    }); 
  }
}
