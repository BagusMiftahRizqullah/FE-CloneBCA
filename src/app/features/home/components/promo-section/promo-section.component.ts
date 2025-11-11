import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PromoService } from '../../../../core/services/promo.service';
import { PromoItem as PromoModel } from '../../../../core/services/models';

interface PromoItem {
  title: string;
  img: string;
  period: string;
}

@Component({
  selector: 'app-promo-section',
  templateUrl: './promo-section.component.html',
  styleUrls: ['./promo-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoSectionComponent implements OnInit {
  heading = 'Promo Terbaru';
  ctaLabel = 'Lihat Semua Promo';
  ctaHref = '#';
  promos: PromoItem[] = [];
  isLoading = true;

  constructor(private promoService: PromoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.promoService.getPromos().subscribe({
      next: (items: PromoModel[]) => {
        this.promos = (items || []).map(i => ({
          title: i.title,
          img: i.imageUrl,
          period: this.formatPeriod(i.periodFrom, i.periodTo),
        }));
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private formatPeriod(fromIso: string, toIso: string): string {
    const fmt = (d?: string) => d ? new Date(d) : undefined;
    const from = fmt(fromIso);
    const to = fmt(toIso);
    const opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const id = 'id-ID';
    if (from && to) return `Periode ${from.toLocaleDateString(id, opts)} - ${to.toLocaleDateString(id, opts)}`;
    if (from && !to) return `Periode ${from.toLocaleDateString(id, opts)}`;
    if (!from && to) return `Sampai ${to.toLocaleDateString(id, opts)}`;
    return '';
  }
}