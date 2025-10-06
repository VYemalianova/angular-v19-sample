import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

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
      map((response) => (response.data?.map(sign => ({
        ...sign,
        iconDir: `assets/images/icons/sign-icons/${sign.signType}.svg`,
        imageDir:`assets/images/icons/sign-images/${sign.signType}.png`,
      })) as ISign[]))
    )
  }
}
