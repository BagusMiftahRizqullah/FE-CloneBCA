import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { NewsCarouselComponent } from './components/news-carousel/news-carousel.component';
import { HeroSearchIframeComponent } from './components/hero-search-iframe/hero-search-iframe.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { HeroCarouselComponent } from './components/hero-carousel/hero-carousel.component';
import { HeroRateCardComponent } from './components/hero-rate-card/hero-rate-card.component';
import { PromoSectionComponent } from './components/promo-section/promo-section.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HeroSectionComponent,
    ServicesSectionComponent,
    NewsCarouselComponent,
    HeroSearchIframeComponent,
    HeroSearchComponent,
    HeroCarouselComponent,
    HeroRateCardComponent,
    PromoSectionComponent,
    NewsSectionComponent,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}