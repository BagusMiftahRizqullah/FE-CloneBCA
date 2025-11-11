import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './api.config';

export interface SearchResult {
  news: Array<{ id: number; title: string; url: string; category?: string; date?: string }>;
  promos: Array<{ id: number; title: string; url: string }>;
  links: Array<{ title: string; url: string }>;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly baseUrl = `${API_CONFIG.baseUrl}/search`;

  constructor(private http: HttpClient) {}

  search(q: string): Observable<SearchResult> {
    const params = new HttpParams().set('q', q);
    return this.http.get<SearchResult>(this.baseUrl, { params });
  }
}