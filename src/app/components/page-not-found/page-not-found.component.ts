import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {
  private authService = inject(AuthService);
  isLoggedIn = false;

  constructor() {
    this.authService.isLoggedIn().then((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
