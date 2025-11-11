import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './api.config';
import { CarouselItem } from './models';

export interface CreateCarouselDto {
  title: string;
  imageUrl: string;
  href: string;
  order: number;
}

@Injectable({ providedIn: 'root' })
export class CarouselService {
  private readonly baseUrl = `${API_CONFIG.baseUrl}/carousel`;

  constructor(private http: HttpClient) {}

  getCarousel(): Observable<CarouselItem[]> {
    return this.http.get<CarouselItem[]>(this.baseUrl);
  }

  createCarousel(payload: CreateCarouselDto): Observable<CarouselItem> {
    return this.http.post<CarouselItem>(this.baseUrl, payload);
  }

  updateCarousel(id: number, payload: Partial<CreateCarouselDto>): Observable<CarouselItem> {
    return this.http.put<CarouselItem>(`${this.baseUrl}/${id}`, payload);
  }

  deleteCarousel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}