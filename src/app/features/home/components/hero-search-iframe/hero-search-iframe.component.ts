import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-search-iframe',
  templateUrl: './hero-search-iframe.component.html',
  styleUrls: ['./hero-search-iframe.component.scss']
})
export class HeroSearchIframeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('frame', { static: true }) frameRef!: ElementRef<HTMLIFrameElement>;

  iframeSrcSafe?: SafeResourceUrl;
  private io?: IntersectionObserver;

  constructor(private sanitizer: DomSanitizer, private host: ElementRef<HTMLElement>) {
    // Initialize with about:blank to satisfy Angular resource URL security until real source is set
    this.iframeSrcSafe = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  }

  ngAfterViewInit(): void {
    const src = 'assets/iframe-search/index.html';
    // Lazy set src only when visible for performance and cross-browser behavior
    this.io = new IntersectionObserver((entries) => {
      const isVisible = entries[0]?.isIntersecting ?? false;
      if (isVisible && !this.iframeSrcSafe) {
        this.iframeSrcSafe = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        this.io?.disconnect();
      }
    }, { rootMargin: '100px', threshold: 0.01 });
    this.io.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}