import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./pages/contact-us/contact-us.component').then((m) => m.ContactUsComponent),
  },
  {
    path: 'horoscope/:type',
    loadChildren: () => import('./pages/horoscope/horoscope.routes').then((m) => m.horoscopeRoutes),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
