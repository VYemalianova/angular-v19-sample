import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ISign } from '../../models/sign.model';
import { SignsService } from '../../services/signs/signs.service';
import { getFormattedDateRange } from '../../utils/dateUtils';
import { HoroscopeType } from '../../models/horoscope.model';
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: 'app-signs-banner',
  imports: [RouterModule, DatePipe, AvatarComponent],
  templateUrl: './signs-banner.component.html',
  styleUrl: './signs-banner.component.scss'
})
export class SignsBannerComponent implements OnInit {
  type = input.required<HoroscopeType>();
  isHeaderHidden = input<boolean>();
  date = input<Date>();

  private signsService = inject(SignsService);
  private destroyRef = inject(DestroyRef);

  signs!: ISign[];

  ngOnInit(): void {
    this.signsService.getSignList().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((signs: ISign[]) => {
      this.signs = signs;
    });
  }

  getDateRange(startDate: string, endDate: string): string {
    return getFormattedDateRange(startDate, endDate)
  }
}
