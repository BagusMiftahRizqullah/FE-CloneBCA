import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UiState {
  isMobileMenuOpen: boolean;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private readonly _uiState$ = new BehaviorSubject<UiState>({ isMobileMenuOpen: false });
  readonly uiState$ = this._uiState$.asObservable();

  toggleMobileMenu() {
    const current = this._uiState$.value;
    this._uiState$.next({ ...current, isMobileMenuOpen: !current.isMobileMenuOpen });
  }
}