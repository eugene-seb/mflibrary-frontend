import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderSearchComponent } from './pages/search/header-search/header-search.component';
import { AuthService } from './core/services/auth.service';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private primeng = inject(PrimeNG);
  currentYear = new Date().getFullYear();

  async ngOnInit() {
    await this.authService.init();
    this.primeng.ripple.set(true);
  }
}
