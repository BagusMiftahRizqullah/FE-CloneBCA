import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Use absolute-from-src path to avoid any IDE/tsserver resolution hiccups
// while keeping runtime semantics unchanged.
import { MaterialModule } from 'src/app/shared/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuickSidebarComponent } from './components/quick-sidebar/quick-sidebar.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, QuickSidebarComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [HeaderComponent, FooterComponent, QuickSidebarComponent, MaterialModule]
})
export class SharedModule {}