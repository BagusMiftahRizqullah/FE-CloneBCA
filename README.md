/*
# BCA Clone Frontend (Angular)

Frontend ini meniru tampilan homepage BCA dan terhubung ke backend untuk mengambil data promo, berita, kurs, dan carousel.

## Teknologi
- Angular 15 (CLI)
- RxJS
- SCSS

## Menjalankan Secara Lokal
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan dev server:
   ```bash
   npm start
   ```
   Aplikasi akan tersedia di `http://localhost:3000/`.

> Catatan: Proyek ini dikonfigurasi untuk menggunakan port 3000 saat pengembangan.

## Integrasi Backend
Frontend mengonsumsi API dari backend pada endpoint:
- `/api/promos`, `/api/news`, `/api/rates`, `/api/carousel`

Konfigurasi base URL API berada di:
```
*/
src/app/core/services/api.config.ts
```
Pastikan backend aktif di `http://localhost:3002/` atau sesuaikan konfigurasi tersebut.

## Fitur yang Ada
- Hero Carousel: menampilkan slide promo dan skeleton saat loading.
- Promo Section: daftar promo dengan skeleton saat loading dan empty-state saat data kosong.
- News Section: featured news + list, skeleton saat loading, empty-state jika tidak ada data.
- Hero Rate Card: kurs eRate, skeleton saat loading, empty-state bila kosong.
- Hero Search: panel pencarian dengan skeleton saat mencari, empty-state jika tidak ada hasil.

## Struktur Direktori
```
bca-clone/
├── src/
│   ├── app/
│   │   ├── core/            # services, models, config API
│   │   ├── shared/          # komponen dan util bersama
│   │   └── features/
│   │       └── home/        # halaman utama dan komponennya
│   ├── assets/
│   ├── index.html
│   └── styles.scss
└── package.json
```

## Build & Testing
- Build: `npm run build`
- Unit test: `npm test`

## Saran Pengembangan
- Tambahkan e2e test (Cypress/Playwright) untuk smoke test UI utama.
- Pertimbangkan menambahkan state management jika kebutuhan makin kompleks.
- Gunakan environment Angular untuk membedakan `api.baseUrl` dev/prod.

## Troubleshooting
- Jika data tidak muncul, pastikan backend aktif dan `api.config.ts` mengarah ke URL yang benar.
- Periksa error di browser console dan terminal dev server untuk petunjuk.
