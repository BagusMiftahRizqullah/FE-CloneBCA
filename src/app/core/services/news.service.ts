import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './api.config';
import { NewsItem } from './models';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly baseUrl = `${API_CONFIG.baseUrl}/news`;

  constructor(private http: HttpClient) {}

  getNews(options?: { featured?: boolean; limit?: number }): Observable<NewsItem[]> {
    let params = new HttpParams();
    if (options?.featured != null) params = params.set('featured', String(options.featured));
    if (options?.limit != null) params = params.set('limit', String(options.limit));
    return this.http.get<NewsItem[]>(this.baseUrl, { params });
  }
}