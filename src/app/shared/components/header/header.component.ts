import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { auditTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSticky = false;
  private scrollSub?: Subscription;
  readonly stickyThreshold = 100; // px

  ngOnInit(): void {
    // Passive scroll listener with light throttling for good performance
    this.scrollSub = fromEvent(window, 'scroll', { passive: true } as EventListenerOptions).pipe(
      auditTime(50),
      map(() => window.scrollY > this.stickyThreshold),
      distinctUntilChanged()
    ).subscribe(isSticky => {
      this.isSticky = isSticky;
    });
  }

  ngOnDestroy(): void {
    this.scrollSub?.unsubscribe();
  }
}