import { Component, EventEmitter, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { LogoComponent } from '../logo/logo.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../auth/auth-modal/auth-modal.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);

  isMobile = input.required<boolean>();
  isMenuOpened = input.required<boolean>();
  isUserLoggedIn = input.required<boolean>();
  menuToggle = output<void>();

  onSignin(): void {
    this.dialog.open(AuthModalComponent, {
      width: '600px',
      disableClose: true,
    });
  }

  onSignout(): void {
    this.authService.clearAuthData();
  }

  onLivePsychics(): void {}
}
