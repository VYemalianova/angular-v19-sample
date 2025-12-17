import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { ToasterService } from '../toaster/toaster.service';
import { ToastNotificationType } from '../../models/notification-type.enum';
import { Router } from '@angular/router';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toasterService = inject(ToasterService);
  const route = inject(Router);

  const accessToken = authService.getAccessToken();
  const requestType = req.params.get('requestType') ?? 'external';
  const isInternalRequest = requestType === 'internal';
  const apiUrl = isInternalRequest ? 'http://localhost:4200' : environment.apiUrl;

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  req = req.clone({
    url: `${apiUrl}${req.url}`,
  });

  return next(req).pipe(
    catchError((res: HttpErrorResponse) => {
      if (res.status === 401) {
        authService.clearAuthData();

        toasterService.openToast({
          type: ToastNotificationType.Error,
          title: 'Missing or invalid authentication token.',
        });
      }

      if (res.status === 404) {
        route.navigate(['/not-found']);
      }

      return throwError(() => res);
    })
  );
};

const handleError = (res: HttpErrorResponse, authService: AuthService, toasterService: ToasterService) => {

}
