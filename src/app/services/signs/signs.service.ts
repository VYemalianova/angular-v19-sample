import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { IResponse } from '../../models/response';
import { ISign } from '../../models/sign.model';

@Injectable({
  providedIn: 'root'
})
export class SignsService {
  private signs: ISign[] = [];

  constructor(private readonly http: HttpClient) { }

  getSigns(): Observable<ISign[]> {
    if (this.signs.length) {
      return of(this.signs);
    }

    return this.http.get<IResponse<ISign[]>>('/signs').pipe(
      map((response) => (this.transformSignsData(response.data!))),
      catchError(() => {
        return this.http.get<ISign[]>('/assets/mocks/signs.json',  { params: { requestType: 'internal' } }).pipe(
          map((data) => (this.transformSignsData(data!))),
        );
      }),
      tap((signs) => this.signs = signs),
    );
  }

  private transformSignsData(data: ISign[]): ISign[] {
    return data?.map(sign => ({
        ...sign,
        // TODO: add id
        iconDir: `assets/images/icons/sign-icons/${sign.signType}.svg`,
        imageDir: `assets/images/icons/sign-images/${sign.signType}.png`,
      })) as ISign[];
  }
}
