import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent implements OnInit {
  private authService = inject(AuthService);
  isLoggedIn = false;

  async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn();
  }
}
