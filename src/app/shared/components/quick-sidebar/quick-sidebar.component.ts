import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quick-sidebar',
  templateUrl: './quick-sidebar.component.html',
  styleUrls: ['./quick-sidebar.component.scss']
})
export class QuickSidebarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('nav', { static: true }) navRef!: ElementRef<HTMLElement>;
  @ViewChild('qs', { static: true }) qsRef!: ElementRef<HTMLElement>;

  private removeTimer: any = null;
  private startDelayTimer: any = null;
  private lastScrollTop = 0;
  private animationDurationMs = 360; // keep in sync with --qs-scroll-duration
  private startDelayMs = 120; // small delay to avoid excessive triggering
  private fallbackScrollHandler?: () => void;
  private lastWindowScrollY = 0;
  private heroEl?: HTMLElement | null;
  private currentMode: 'default' | 'compact' = 'default';
  private lastToggleTs = 0;
  private rafPending = false;

  private onWindowScroll = () => {
    if (this.rafPending) return;
    this.rafPending = true;
    window.requestAnimationFrame(() => {
      this.rafPending = false;
      const currentY = window.scrollY;
      const directionClass = currentY > this.lastWindowScrollY ? 'is-scrolling-down' : 'is-scrolling-up';
      this.lastWindowScrollY = currentY;
      this.triggerScrollAnimation(directionClass);
      this.evaluateModeHysteresis();
    });
  };

  ngAfterViewInit(): void {
    const nav = this.navRef.nativeElement;
    // Ensure we have overflow for scroll detection
    nav.addEventListener('scroll', this.onScroll, { passive: true });
    nav.addEventListener('wheel', this.onWheel, { passive: true });

    // Also animate on page scroll (not just sidebar scroll) so users always see subtle movement
    window.addEventListener('scroll', this.onWindowScroll, { passive: true });

    // Observe hero section visibility to toggle compact mode
    this.heroEl = document.querySelector('app-hero-section');
    if (!this.heroEl) {
      // Fallback: compact mode after initial scroll beyond 50px
      const onFallbackScroll = () => {
        const scrolledPast = window.scrollY > 50;
        this.applyMode(scrolledPast ? 'compact' : 'default');
      };
      this.fallbackScrollHandler = onFallbackScroll;
      window.addEventListener('scroll', this.fallbackScrollHandler, { passive: true });
      // Initial state
      onFallbackScroll();
    }

    // Initial evaluation
    this.evaluateModeHysteresis();
  }

  ngOnDestroy(): void {
    const nav = this.navRef?.nativeElement;
    if (nav) {
      nav.removeEventListener('scroll', this.onScroll as any);
      nav.removeEventListener('wheel', this.onWheel as any);
    }
    window.clearTimeout(this.removeTimer);
    window.clearTimeout(this.startDelayTimer);
    if (this.fallbackScrollHandler) {
      window.removeEventListener('scroll', this.fallbackScrollHandler as any);
    }
    window.removeEventListener('scroll', this.onWindowScroll as any);
  }

  private onWheel = (event: WheelEvent) => {
    const directionClass = event.deltaY > 0 ? 'is-scrolling-down' : 'is-scrolling-up';
    this.triggerScrollAnimation(directionClass);
  };

  private onScroll = () => {
    const nav = this.navRef.nativeElement;
    const directionClass = nav.scrollTop > this.lastScrollTop ? 'is-scrolling-down' : 'is-scrolling-up';
    this.lastScrollTop = nav.scrollTop;
    this.triggerScrollAnimation(directionClass);
  };

  private triggerScrollAnimation(directionClass: 'is-scrolling-down' | 'is-scrolling-up') {
    const nav = this.navRef.nativeElement;
    // Debounce start to avoid flicker during fast scrolling
    window.clearTimeout(this.startDelayTimer);
    this.startDelayTimer = window.setTimeout(() => {
      nav.classList.add('is-scrolling');
      nav.classList.remove('is-scrolling-down', 'is-scrolling-up');
      nav.classList.add(directionClass);

      // Remove classes after duration to reset state
      window.clearTimeout(this.removeTimer);
      this.removeTimer = window.setTimeout(() => {
        nav.classList.remove('is-scrolling', 'is-scrolling-down', 'is-scrolling-up');
      }, this.animationDurationMs);
    }, this.startDelayMs);
  }

  private applyMode(mode: 'default' | 'compact') {
    if (mode === this.currentMode) return;
    this.currentMode = mode;
    const qsEl = this.qsRef.nativeElement;
    if (mode === 'compact') {
      qsEl.classList.add('qs--compact');
      document.documentElement.style.setProperty('--qs-width', '84px');
    } else {
      qsEl.classList.remove('qs--compact');
      document.documentElement.style.setProperty('--qs-width', '200px');
    }
  }

  private evaluateModeHysteresis() {
    const now = performance.now();
    // minimal dwell time to prevent rapid toggling
    if (now - this.lastToggleTs < 500) return;

    const heroHeight = this.heroEl?.offsetHeight ?? 0;
    if (!heroHeight) {
      const compact = window.scrollY > 50;
      this.applyMode(compact ? 'compact' : 'default');
      this.lastToggleTs = now;
      return;
    }

    const y = window.scrollY;
    const enterThreshold = heroHeight * 0.8; // compact when past 80% of hero
    const exitThreshold = heroHeight * 0.6;  // revert to default when back above 60% of hero

    if (this.currentMode === 'default' && y >= enterThreshold) {
      this.applyMode('compact');
      this.lastToggleTs = now;
    } else if (this.currentMode === 'compact' && y <= exitThreshold) {
      this.applyMode('default');
      this.lastToggleTs = now;
    }
  }
}