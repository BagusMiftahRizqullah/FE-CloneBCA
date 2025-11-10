import { ChangeDetectionStrategy, Component, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSearchComponent {
  query = '';
  results: { title: string; desc?: string }[] = [];
  showResults = false;
  private debounceHandle: any;
  expanded = false; // state untuk tampilan baru (panel populer)
  activeIndex = -1; // untuk navigasi keyboard

  // Demo dataset agar bisa diuji langsung
  private data = [
    { title: 'Buka Rekening Tahapan', desc: 'Pembukaan rekening baru' },
    { title: 'KPR BCA', desc: 'Kredit Pemilikan Rumah' },
    { title: 'Kartu Kredit', desc: 'Produk kartu kredit BCA' },
    { title: 'Tabungan', desc: 'Produk tabungan' },
    { title: 'Kurs eRate', desc: 'Informasi kurs terkini' },
    { title: 'Halo BCA', desc: 'Layanan pelanggan' },
  ];

  @Output() search = new EventEmitter<string>();

  constructor(private el: ElementRef<HTMLElement>) {}

  onInput(ev: Event) {
    const target = ev.target as HTMLInputElement;
    this.query = target.value;
    if (this.debounceHandle) { clearTimeout(this.debounceHandle); }
    this.debounceHandle = setTimeout(() => {
      this.search.emit(this.query);
      this.filter();
    }, 250);
  }

  onSubmit() {
    this.search.emit(this.query);
    this.filter();
  }

  // onPress: ubah tampilan ke panel populer sesuai referensi
  onPress() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      // tampilkan daftar populer ketika panel dibuka
      this.results = [
        { title: 'PALING POPULER' },
        { title: 'Promo BCA' },
        { title: 'myBCA' },
        { title: 'Poket Valas BCA' },
        { title: 'Awas Modus' },
        { title: 'Buka Rekening Tahapan' },
      ];
      this.showResults = true;
      this.activeIndex = 1; // fokus awal ke item pertama setelah judul
    } else {
      // tutup panel
      this.showResults = false;
      this.activeIndex = -1;
    }
  }

  // Navigasi keyboard pada panel
  onKeyDown(ev: KeyboardEvent) {
    if (!this.showResults) return;
    const key = ev.key;
    if (key === 'Escape') { this.expanded = false; this.showResults = false; this.activeIndex = -1; return; }
    if (key === 'ArrowDown') { ev.preventDefault(); this.activeIndex = Math.min(this.results.length - 1, Math.max(1, this.activeIndex + 1)); }
    if (key === 'ArrowUp') { ev.preventDefault(); this.activeIndex = Math.max(1, this.activeIndex - 1); }
    if (key === 'Enter') { ev.preventDefault(); const item = this.results[this.activeIndex]; if (item) { this.select(item); } }
  }

  select(item: { title: string; desc?: string }) {
    // Emit pilihan dan tutup panel
    this.query = item.title !== 'PALING POPULER' ? item.title : this.query;
    this.search.emit(this.query);
    this.expanded = false;
    this.showResults = false;
  }

  // Tutup panel saat klik di luar komponen (click outside)
  @HostListener('document:click', ['$event'])
  onDocumentClick(ev: MouseEvent) {
    const target = ev.target as Node;
    if (!this.el.nativeElement.contains(target)) {
      this.expanded = false;
      this.showResults = false;
      this.activeIndex = -1;
    }
  }

  private filter() {
    const q = (this.query || '').toLowerCase().trim();
    if (!q) { this.results = []; this.showResults = false; return; }
    this.results = this.data.filter(d => (d.title + ' ' + (d.desc || '')).toLowerCase().includes(q)).slice(0, 6);
    this.showResults = true;
  }
}

