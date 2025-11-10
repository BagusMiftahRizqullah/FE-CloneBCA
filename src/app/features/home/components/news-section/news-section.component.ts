import { ChangeDetectionStrategy, Component } from '@angular/core';

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
export class NewsSectionComponent {
  tabs = ['News & Features', 'Edukatips', '#AwasModus'];
  activeTab = this.tabs[0];

  // Use same image across all cards per user instruction
  readonly defaultImg = 'https://www.bca.co.id/-/media/Feature/Card/Main-Banner-Card/Personal/20251104-KPR-Berjenjang-Nov-2025.png';

  featured: NewsItem = {
    title: 'Telah Hadir, Batavia USD Money Market, Reksa Dana Pasar Uang USD di BCA',
    date: '7 Nov 2025 | Berita',
    img: this.defaultImg,
    href: '#',
  };

  items: NewsItem[] = [
    { title: 'Pemberitahuan Penyesuaian Limit Nominal Transaksi', date: '21 Okt 2025 | Berita', img: this.defaultImg, href: '#' },
    { title: 'BCA Raih Predikat "Marketer of the Year" Tiga Tahun…', date: '22 Okt 2025 | Berita', img: this.defaultImg, href: '#' },
    { title: 'Pemberitahuan terkait Rencana Penggantian Bank…', date: '28 Okt 2025 | Berita', img: this.defaultImg, href: '#' },
    { title: 'Penutupan Layanan Operasional dan…', date: '4 Feb 2025 | Berita', img: this.defaultImg, href: '#' },
    { title: 'Temukan Lebih Banyak Pilihan Paket Data…', date: '8 Okt 2025 | Berita', img: this.defaultImg, href: '#' },
    { title: 'Dapatkan Paket Data XL dan AXIS Sesuai Kebutuhan…', date: '3 Okt 2025 | Berita', img: this.defaultImg, href: '#' },
  ];
}