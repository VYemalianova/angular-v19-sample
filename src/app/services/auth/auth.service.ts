import { Injectable } from '@angular/core';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { localStorageKeys } from '../../models/localStorageKeys.enum';
import { IUser } from '../../models/user.model';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { IAuthResponse, IResponse } from '../../models/response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<IUser | null>(null);

  user$ = this.user.asObservable();

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly http: HttpClient,
  ) { }

  getAccessToken(): string | null {
    return this.localStorageService.getItem(localStorageKeys.TOKEN_KEY);
  }

  setAuthData(user: IUser, token: string) {
    this.localStorageService.setItem(localStorageKeys.USER_KEY, JSON.stringify(user));
    this.localStorageService.setItem(localStorageKeys.TOKEN_KEY, token);

    this.user.next(user);
  };

  clearAuthData() {
    this.localStorageService.removeItem(localStorageKeys.USER_KEY);
    this.localStorageService.removeItem(localStorageKeys.TOKEN_KEY);

    this.user.next(null);
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
