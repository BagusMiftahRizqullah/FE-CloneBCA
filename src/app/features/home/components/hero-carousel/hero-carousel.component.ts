import { ChangeDetectionStrategy, Component, ChangeDetectorRef, NgZone, OnDestroy, OnInit } from '@angular/core';

interface Slide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      src: 'https://www.bca.co.id/-/media/Feature/Card/Main-Banner-Card/Personal/20251001-gebyar-1.jpeg',
      alt: 'Gebyar Hadiah BCA 1',
    },
    {
      src: 'https://www.bca.co.id/-/media/Feature/Card/Main-Banner-Card/Personal/20251001-gebyar-2.jpeg',
      alt: 'Gebyar Hadiah BCA 2',
    },
    {
      src: 'https://www.bca.co.id/-/media/Feature/Card/Main-Banner-Card/Personal/20251104-KPR-Berjenjang-Nov-2025.png',
      alt: 'KPR Berjenjang Nov 2025',
    },
  ];

  index = 0;
  private autoplayId?: any;
  private autoplayMs = 3000; // auto swipe setiap 3 detik

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) {}

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  prev() { this.index = (this.index - 1 + this.slides.length) % this.slides.length; }
  next() { this.index = (this.index + 1) % this.slides.length; }
  go(i: number) { this.index = i % this.slides.length; }

  private startAutoplay() {
    this.stopAutoplay();
    this.autoplayId = setInterval(() => {
      // Pastikan perubahan state dijalankan dalam Angular zone agar OnPush ter-update
      this.zone.run(() => {
        this.next();
        this.cdr.markForCheck();
      });
    }, this.autoplayMs);
  }

  private stopAutoplay() {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
      this.autoplayId = undefined;
    }
  }
}