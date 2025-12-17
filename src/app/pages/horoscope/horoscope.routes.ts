import { Routes } from '@angular/router';

import { HoroscopeComponent } from './horoscope/horoscope.component';
import { HoroscopeDetailsComponent } from './horoscope-details/horoscope-details.component';

export const horoscopeRoutes: Routes = [
  { path: '', component: HoroscopeComponent },
  { path: ':sign', component: HoroscopeDetailsComponent },
];
