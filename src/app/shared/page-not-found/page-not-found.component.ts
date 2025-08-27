import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent implements OnInit {
  private authService: AuthService;
  private destroyRef: DestroyRef;
  isAuthenticated: boolean;

  constructor() {
    this.authService = inject(AuthService);
    this.destroyRef = inject(DestroyRef);
    this.isAuthenticated = false;
  }

  async ngOnInit() {
    this.authService.isAuthenticated$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isAuth) => (this.isAuthenticated = isAuth));
  }
}
