import { Component, EventEmitter, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMobile = input.required<boolean>();
  isMenuOpened = input.required<boolean>();
  menuToggle = output<void>();

  onSignin(): void {}

  onLivePsychics(): void {}
}
