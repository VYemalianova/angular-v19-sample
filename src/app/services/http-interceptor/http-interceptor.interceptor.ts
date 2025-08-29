import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();
  const apiUrl = environment.apiUrl;

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
      handleError(res);

      return throwError(() => res);
    })
  );
};


const handleError = (res: HttpErrorResponse) => {
  console.error(res.status, res.statusText);
}
