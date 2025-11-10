import { Component } from '@angular/core';

interface NewsItem { title: string; date: string; }

@Component({
  selector: 'app-news-carousel',
  templateUrl: './news-carousel.component.html',
  styleUrls: ['./news-carousel.component.scss']
})
export class NewsCarouselComponent {
  news: NewsItem[] = [
    { title: 'Pengumuman layanan BCA pada hari libur nasional', date: '2025-10-01' },
    { title: 'Promo spesial kartu kredit BCA', date: '2025-09-21' },
    { title: 'Peningkatan keamanan aplikasi myBCA', date: '2025-09-10' },
  ];
}