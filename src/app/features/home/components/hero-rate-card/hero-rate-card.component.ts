import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RatesService } from '../../../../core/services/rates.service';
import { RateItem } from '../../../../core/services/models';

interface CurrencyRate {
  code: string;
  buy: number;
  sell: number;
  flagSrc?: string; // optional flag icon
}

@Component({
  selector: 'app-hero-rate-card',
  templateUrl: './hero-rate-card.component.html',
  styleUrls: ['./hero-rate-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroRateCardComponent implements OnInit {
  currencies: CurrencyRate[] = [];
  isLoading = true;

  index = 0;

  get selected(): CurrencyRate {
    return this.currencies.length ? this.currencies[this.index] : { code: '', buy: 0, sell: 0 };
  }

  prev() {
    if (!this.currencies.length) return;
    this.index = (this.index - 1 + this.currencies.length) % this.currencies.length;
  }
  next() {
    if (!this.currencies.length) return;
    this.index = (this.index + 1) % this.currencies.length;
  }

  format(n: number): string {
    return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  }

  constructor(private ratesService: RatesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ratesService.getRates().subscribe({
      next: (items: RateItem[]) => {
        this.currencies = (items || []).map(i => ({
          code: i.code,
          buy: i.buy,
          sell: i.sell,
          flagSrc: i.flagSrc,
        }));
        // Ensure index is valid
        this.index = this.currencies.length ? 0 : -1 as any;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }
}