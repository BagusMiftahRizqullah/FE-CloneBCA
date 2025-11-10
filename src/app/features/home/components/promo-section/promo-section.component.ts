import { ChangeDetectionStrategy, Component } from '@angular/core';

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
export class PromoSectionComponent {
  heading = 'Promo Terbaru';
  ctaLabel = 'Lihat Semua Promo';
  ctaHref = '#';

  promos: PromoItem[] = [
    {
      title: 'Electronic City - Diskon Hingga Rp1.000.000',
      img: 'https://pustaka.bca.co.id/Promo/A2C31A68-BC10-4CBD-AB51-85474A36CC50/Detail/ImageListing/20251110_Eci-Gading-Serpong-Thumb.jpg',
      period: 'Periode 09 Nov 2025 - 15 Nov 2025',
    },
    {
      title: 'BCA Travel Service - Potongan Rp2 Juta',
      img: 'https://pustaka.bca.co.id/Promo/A2C31A68-BC10-4CBD-AB51-85474A36CC50/Detail/ImageCover/20251110_bca-travel-service-bann.jpg?v=10112025114546',
      period: 'Periode 31 Jan 2026',
    },
    {
      title: 'HONOR Experience Store Emporium Pluit…',
      img: 'https://pustaka.bca.co.id/Promo/A2C31A68-BC10-4CBD-AB51-85474A36CC50/Detail/ImageCover/20251107_Honor_Web%20Insertion%20980x350%20H.jpg?v=10112025124233',
      period: 'Periode 08 Nov 2025 - 16 Nov 2025',
    },
    {
      title: 'Atria - Harga Spesial',
      img: 'https://pustaka.bca.co.id/Promo/A2C31A68-BC10-4CBD-AB51-85474A36CC50/Detail/ImageCover/20251110_Atria-banner.jpg?v=10112025124327',
      period: 'Periode 10 Nov 2025 - 24 Nov 2025',
    },
  ];
}