import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NewsService } from '../../../../core/services/news.service';
import { NewsItem as NewsModel } from '../../../../core/services/models';

interface NewsItem {
  title: string;
  date: string; // ISO or display
  img: string;
  href: string;
}

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsSectionComponent implements OnInit {
  tabs = ['News & Features', 'Edukatips', '#AwasModus'];
  activeTab = this.tabs[0];

  // Use same image across all cards per user instruction
  readonly defaultImg = 'https://www.bca.co.id/-/media/Feature/Card/Main-Banner-Card/Personal/20251104-KPR-Berjenjang-Nov-2025.png';

  featured: NewsItem | null = null;
  items: NewsItem[] = [];
  isLoading = true;

  constructor(private newsService: NewsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.newsService.getNews({ featured: true, limit: 7 }).subscribe({
      next: (items: NewsModel[]) => {
        const mapped = (items || []).map(i => this.mapNews(i));
        if (mapped.length) {
          this.featured = mapped[0];
          this.items = mapped.slice(1);
        } else {
          this.featured = null;
          this.items = [];
        }
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private mapNews(i: NewsModel): NewsItem {
    const category = i.category || 'Berita';
    const dateStr = this.formatDate(i.date) + ' | ' + category;
    return {
      title: i.title,
      date: dateStr,
      img: i.imageUrl || this.defaultImg,
      href: i.url || '#',
    };
  }

  private formatDate(iso?: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}