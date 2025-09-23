import { Component, DestroyRef, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MenuItemComponent } from '../menu-item/menu-item.component';
import { SignsService } from '../../../services/signs/signs.service';
import { HoroscopeType } from '../../../models/horoscope.model';
import { IOption } from '../../../models/option.model';
import { ISign } from '../../../models/sign.model';
import { getFormattedDateRange } from '../../../utils/dateUtils';

@Component({
  selector: 'app-horizontal-menu',
  imports: [RouterModule, MatMenuModule, MatIconModule, MatButtonModule, MenuItemComponent],
  templateUrl: './horizontal-menu.component.html',
  styleUrl: './horizontal-menu.component.scss'
})
export class HorizontalMenuComponent {
  isUserLoggedIn = input.required<boolean>();

  private destroyRef = inject(DestroyRef);
  private signsService = inject(SignsService);

  readonly HoroscopeType = HoroscopeType;

  signsOptions: IOption[] = [];
  horoscopeOptions: IOption[] = [];

  ngOnInit(): void {
    this.horoscopeOptions = Object.entries(HoroscopeType).map(([key, value]) => ({
      id: key,
      value,
    }));
    
    this.signsService.getSigns().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((signs: ISign[]) => {
      this.signsOptions = signs.map((sign) => ({
        id: sign.id,
        value: sign.signType,
        icon: sign.iconDir,
        info: `(${getFormattedDateRange(sign.startDate, sign.endDate)})`,
      }));
    })
  }
}
