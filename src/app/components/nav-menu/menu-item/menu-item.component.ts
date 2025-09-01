import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AvatarComponent } from '../../avatar/avatar.component';
import { IOption } from '../../../models/option.model';

@Component({
  selector: 'app-menu-item',
  imports: [RouterModule, AvatarComponent],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  item = input.required<IOption>();
  navigateTo = input.required<string>();
}
