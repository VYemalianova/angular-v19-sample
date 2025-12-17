import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HoroscopeType, IHoroscope } from '../../models/horoscope.model';
import { IResponse } from '../../models/response';
import { SignType } from '../../models/sign.model';

@Injectable({
  providedIn: 'root'
})
export class HoroscopeService {
  constructor(private readonly http: HttpClient) { }

  getHoroscopeDetails(
    type: HoroscopeType,
    sign: SignType,
    startDate?: string,
    endDate?: string
  ): Observable<IHoroscope> {
    const params = {
      horoscopeType: type,
      signType: sign,
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    }

    return this.http.get<IResponse<IHoroscope>>('/horoscope', { params }).pipe(
      map(response => response.data as IHoroscope),
    );
  }
}
