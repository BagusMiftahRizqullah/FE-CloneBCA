import { ChangeDetectionStrategy, Component } from '@angular/core';

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
export class HeroRateCardComponent {
  currencies: CurrencyRate[] = [
    { code: 'EUR', buy: 19255.41, sell: 19269.47, flagSrc: 'https://flagcdn.com/w40/eu.png' },
    { code: 'USD', buy: 15500.12, sell: 15520.89, flagSrc: 'https://flagcdn.com/w40/us.png' },
    { code: 'SGD', buy: 5248.00, sell: 5418.00, flagSrc: 'https://flagcdn.com/w40/sg.png' },
  ];

  index = 0;

  get selected(): CurrencyRate { return this.currencies[this.index]; }

  prev() { this.index = (this.index - 1 + this.currencies.length) % this.currencies.length; }
  next() { this.index = (this.index + 1) % this.currencies.length; }

  format(n: number): string {
    return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  }
}