import { Component, computed, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NgTemplateOutlet } from '@angular/common';

import { ToastNotificationType } from '../../models/notification-type.enum';
import { IToasterData } from '../../models/toaster-data.model';

@Component({
  selector: 'app-toaster',
  imports: [MatIcon, NgTemplateOutlet],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {
  readonly data = inject<IToasterData & { close: () => void }>(MAT_SNACK_BAR_DATA);
  readonly icon = computed(() => {
    switch (this.data.type) {
      case ToastNotificationType.Error:
        return 'error';
      case ToastNotificationType.Success:
        return 'check_circle';
      case ToastNotificationType.Info:
        return 'info';
      case ToastNotificationType.Warn:
        return 'warning';
      default:
        return 'warning';
    }
  });
}
