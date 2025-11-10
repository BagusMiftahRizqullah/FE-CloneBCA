import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <app-header></app-header>
    <main class="main" role="main" id="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bca-clone';
}
