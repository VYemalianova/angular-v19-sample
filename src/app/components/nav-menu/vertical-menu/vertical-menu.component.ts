import { Component, DestroyRef, effect, inject, input, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HoroscopeType } from '../../../models/horoscope.model';
import { IOption } from '../../../models/option.model';
import { SignsService } from '../../../services/signs/signs.service';
import { getFormattedDateRange } from '../../../utils/dateUtils';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { LogoComponent } from '../../logo/logo.component';


@Component({
  selector: 'app-vertical-menu',
  imports: [RouterModule, MatExpansionModule, MenuItemComponent, LogoComponent],
  templateUrl: './vertical-menu.component.html',
  styleUrl: './vertical-menu.component.scss'
})
export class VerticalMenuComponent {
  isMenuClosed = input.required<boolean>();
  isUserLoggedIn = input.required<boolean>();

  private signsService = inject(SignsService);
  private destroyRef = inject(DestroyRef);

  private accordion = viewChild.required<MatAccordion>(MatAccordion);

  readonly HoroscopeType = HoroscopeType;

  signsOptions: IOption[] = [];
  horoscopeOptions: IOption[] = [];


  constructor() {
    effect(() => {
      if (this.isMenuClosed()) {
        this.accordion().closeAll();
      }
    })
  }

  ngOnInit(): void {
    this.horoscopeOptions = Object.entries(HoroscopeType).map(([key, value]) => ({
      id: key,
      value,
    }));
    
    this.signsService.getSignList().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((signs) => {
      this.signsOptions = signs.map((sign) => ({
        id: sign.id,
        value: sign.signType,
        icon: sign.iconDir,
        info: `(${getFormattedDateRange(sign.startDate, sign.endDate)})`,
      }));
    })
  }
}
