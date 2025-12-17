import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';

import { HoroscopeType, IHoroscope } from '../../../models/horoscope.model';
import { ISign, SignType } from '../../../models/sign.model';
import { HoroscopeService } from '../../../services/horoscope/horoscope.service';
import { SignsService } from '../../../services/signs/signs.service';
import { SignsBannerComponent } from '../../../components/signs-banner/signs-banner.component';
import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { ErrorScreenComponent } from "../../../components/error-screen/error-screen.component";
import { DatePipe } from '@angular/common';
import { getFormattedDateRange } from '../../../utils/dateUtils';
import { DateFormat } from '../../../models/date.types';

@Component({
  selector: 'app-horoscope-details',
  imports: [SignsBannerComponent, DatePipe, AvatarComponent, ErrorScreenComponent],
  templateUrl: './horoscope-details.component.html',
  styleUrl: './horoscope-details.component.scss'
})
export class HoroscopeDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private horoscopeService = inject(HoroscopeService);
  private signsService = inject(SignsService);

  readonly HoroscopeType = HoroscopeType;

  horoscope!: IHoroscope & { dateRange: string} ;
  sign!: ISign;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map(params => ({type: params.get('type') as HoroscopeType, sign: params.get('sign') as SignType})),
        switchMap(({ type, sign }) => {
          return forkJoin([
            this.horoscopeService.getHoroscopeDetails(type, sign),
            this.signsService.getSign(sign)
          ]);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([horoscope, sign]) => {
        this.horoscope = {
          ...horoscope,
          dateRange: getFormattedDateRange(horoscope.startDate, horoscope.endDate, DateFormat.FullDayDate),
        };
        this.sign = sign;
      });
  }
}
