import { Component, DestroyRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { HeaderComponent } from './components/header/header.component';
import { BreakpointService } from './services/breakpoint/breakpoint.service';
import { HorizontalMenuComponent } from './components/nav-menu/horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from './components/nav-menu/vertical-menu/vertical-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, HeaderComponent, HorizontalMenuComponent, VerticalMenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private breakpointService = inject(BreakpointService);
  private authService = inject(AuthService);

  private sidenav = viewChild.required<MatSidenav>(MatSidenav);

  isMobile = this.breakpointService.isMobile.asReadonly();
  isUserLoggedIn = signal(false);

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          if (this.sidenav().opened) {
            this.sidenav().close();
          }
        });

    this.authService.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      this.isUserLoggedIn.set(Boolean(user));

      if (!user) {
        this.authService.clearAuthData();
      }
    });
  }

}
