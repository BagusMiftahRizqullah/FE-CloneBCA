import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './api.config';
import { RateItem } from './models';

export interface UpdateRateDto {
  buy?: number;
  sell?: number;
  flagSrc?: string;
}

@Injectable({ providedIn: 'root' })
export class RatesService {
  private readonly baseUrl = `${API_CONFIG.baseUrl}/rates`;

  constructor(private http: HttpClient) {}

  getRates(): Observable<RateItem[]> {
    return this.http.get<RateItem[]>(this.baseUrl);
  }

  updateRate(id: number, payload: UpdateRateDto): Observable<RateItem> {
    return this.http.put<RateItem>(`${this.baseUrl}/${id}`, payload);
  }
}