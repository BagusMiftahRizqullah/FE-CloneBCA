import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './api.config';
import { PromoItem } from './models';

export interface CreatePromoDto {
  title: string;
  imageUrl: string;
  periodFrom: string; // ISO
  periodTo: string; // ISO
  url: string;
  featured: boolean;
}

@Injectable({ providedIn: 'root' })
export class PromoService {
  private readonly baseUrl = `${API_CONFIG.baseUrl}/promos`;

  constructor(private http: HttpClient) {}

  getPromos(): Observable<PromoItem[]> {
    return this.http.get<PromoItem[]>(this.baseUrl);
  }

  createPromo(payload: CreatePromoDto): Observable<PromoItem> {
    return this.http.post<PromoItem>(this.baseUrl, payload);
  }

  updatePromo(id: number, payload: Partial<CreatePromoDto>): Observable<PromoItem> {
    return this.http.put<PromoItem>(`${this.baseUrl}/${id}`, payload);
  }

  deletePromo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}