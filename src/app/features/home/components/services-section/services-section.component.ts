import { Component } from '@angular/core';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.scss']
})
export class ServicesSectionComponent {
  services: ServiceItem[] = [
    { icon: 'credit_card', title: 'Kartu Kredit', description: 'Nikmati berbagai promo dan kemudahan transaksi.' },
    { icon: 'home', title: 'KPR', description: 'Wujudkan rumah impian Anda dengan bunga kompetitif.' },
    { icon: 'savings', title: 'Tabungan & Deposito', description: 'Pilihan tabungan sesuai kebutuhan Anda.' },
    { icon: 'account_balance', title: 'Kartu Debit', description: 'Transaksi harian yang mudah dan aman.' },
    { icon: 'smartphone', title: 'Mobile Banking', description: 'Akses layanan perbankan kapanpun dimanapun.' },
    { icon: 'business', title: 'BCA Bisnis', description: 'Solusi perbankan untuk kebutuhan bisnis Anda.' },
  ];
}