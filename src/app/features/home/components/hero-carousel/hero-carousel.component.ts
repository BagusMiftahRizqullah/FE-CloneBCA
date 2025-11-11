import { ChangeDetectionStrategy, Component, ChangeDetectorRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CarouselService } from '../../../../core/services/carousel.service';
import { CarouselItem } from '../../../../core/services/models';

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
  slides: Slide[] = [];
  isLoading = true;

  index = 0;
  private autoplayId?: any;
  private autoplayMs = 3000; // auto swipe setiap 3 detik

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private carouselService: CarouselService,
  ) {}

  ngOnInit(): void {
    // Ambil data carousel dari backend
    this.carouselService.getCarousel().subscribe({
      next: (items: CarouselItem[]) => {
        this.slides = (items || []).map(i => ({
          src: i.imageUrl,
          alt: i.title || 'Slide',
          title: i.title,
          subtitle: undefined,
        }));
        // Mulai autoplay hanya jika ada slides
        if (this.slides.length > 0) {
          this.startAutoplay();
        }
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        // Jika gagal, biarkan tanpa autoplay agar tidak modulo 0
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  prev() {
    if (!this.slides.length) return;
    this.index = (this.index - 1 + this.slides.length) % this.slides.length;
  }
  next() {
    if (!this.slides.length) return;
    this.index = (this.index + 1) % this.slides.length;
  }
  go(i: number) {
    if (!this.slides.length) return;
    this.index = i % this.slides.length;
  }

  private startAutoplay() {
    this.stopAutoplay();
    if (!this.slides.length) return;
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