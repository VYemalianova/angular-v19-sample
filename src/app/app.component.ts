import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderComponent } from './components/header/header.component';
import { BreakpointService } from './services/breakpoint/breakpoint.service';
import { HorizontalMenuComponent } from './components/nav-menu/horizontal-menu/horizontal-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, HeaderComponent, HorizontalMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  breakpointService = inject(BreakpointService);
}
