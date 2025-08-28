import { Injectable } from '@angular/core';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { localStorageKeys } from '../../models/localStorageKeys.enum';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!: IUser;

  constructor(private readonly localStorageService: LocalStorageService) { }

  setAccessToken(token: string): void {
    this.localStorageService.setItem(localStorageKeys.token, token);
  }

  getAccessToken(): string | null {
    return this.localStorageService.getItem(localStorageKeys.token);
  }

  removeAccessToken(): void {
    this.localStorageService.removeItem(localStorageKeys.token);
  }

  getUser() {
    return this.user;
  }
}
