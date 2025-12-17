import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { IResponse } from '../../models/response';
import { ISign, SignType } from '../../models/sign.model';

@Injectable({
  providedIn: 'root'
})
export class SignsService {
  private signs: ISign[] = [];

  constructor(private readonly http: HttpClient) { }

  getSignList(): Observable<ISign[]> {
    if (this.signs.length) {
      return of(this.signs);
    }

    return this.http.get<IResponse<ISign[]>>('/signs').pipe(
      map((response) => (response.data?.map(sign => this.transformSign(sign))) ?? []),
      catchError(() => {
        return this.http.get<ISign[]>('/assets/mocks/signs.json',  { params: { requestType: 'internal' } }).pipe(
          map((data) => (data?.map(sign => this.transformSign(sign)))),
        );
      }),
      tap((signs) => this.signs = signs),
    );
  }

  getSign(signType: SignType): Observable<ISign> {
    return this.http.get<IResponse<ISign>>(`/signs/${signType}`).pipe(
      map((response) => (this.transformSign(response.data as ISign))),
      catchError(() => {
        return this.getSignList().pipe(map((signs: ISign[]) => this.transformSign((signs.find((el) => el.signType === signType) as ISign))))
      }),
    );
  }

  private transformSign(sign: ISign): ISign {
    return {
      ...sign,
      ...(!sign.id && {id : uuidv4()}),
      iconDir: `assets/images/icons/sign-icons/${sign.signType}.svg`,
      imageDir: `assets/images/icons/sign-images/${sign.signType}.png`,
    }
  }
}
