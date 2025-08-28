import { Injectable } from '@angular/core';

import { localStorageKeys } from '../../models/localStorageKeys.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem<T>(key: localStorageKeys): T | null {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue);
  }

  setItem(key: localStorageKeys, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  removeItem(key: localStorageKeys): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  }
}
