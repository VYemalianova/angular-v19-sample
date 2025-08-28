import { Routes } from '@angular/router';

import { HoroscopeComponent } from './horoscope/horoscope.component';
import { SignDetailsComponent } from './sign-details/sign-details.component';

export const horoscopeRoutes: Routes = [
  { path: '', component: HoroscopeComponent },
  { path: ':sign', component: SignDetailsComponent },
];
