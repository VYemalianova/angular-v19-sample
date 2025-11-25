import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { localStorageKeys } from '../../models/localStorageKeys.enum';
import { IUser } from '../../models/user.model';
import { IAuthResponse, IResponse } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = signal<IUser | null>(null);

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly http: HttpClient,
  ) { }

  getAccessToken(): string | null {
    return this.localStorageService.getItem(localStorageKeys.TOKEN_KEY);
  }

  initializeAuthState(): void {
    const storedUser = this.localStorageService.getItem(localStorageKeys.USER_KEY);
    const storedToken = this.localStorageService.getItem(localStorageKeys.TOKEN_KEY);

    if (storedUser && storedToken) {
      this.setAuthData(storedUser as IUser, storedToken as string);
    }
  }

  setAuthData(user: IUser, token: string) {
    this.localStorageService.setItem(localStorageKeys.USER_KEY, JSON.stringify(user));
    this.localStorageService.setItem(localStorageKeys.TOKEN_KEY, token);

    this.user.set(user);
  };

  clearAuthData() {
    this.localStorageService.removeItem(localStorageKeys.USER_KEY);
    this.localStorageService.removeItem(localStorageKeys.TOKEN_KEY);

    this.user.set(null);
  };

  authenticate(mode: 'signin' | 'signup', data: { email: string; password: string }): Observable<IUser> {
    return this.http.post<IResponse<IAuthResponse>>(`/auth/${mode}`, data).pipe(
      filter(response => response.success),
      tap(response => {
        this.setAuthData(response.data?.user as IUser, response.data?.token as string);
      }),
      map(response => response.data?.user as IUser)
    );
  }
}
