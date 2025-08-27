import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private authService: AuthService;
  private destroyRef: DestroyRef;
  isAuthenticated: boolean;
  username: string;

  constructor() {
    this.authService = inject(AuthService);
    this.destroyRef = inject(DestroyRef);
    this.isAuthenticated = false;
    this.username = '';
  }

  async ngOnInit() {
    this.authService.isAuthenticated$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isAuth) => (this.isAuthenticated = isAuth));

    this.authService.profile$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((profile) => {
        this.username = profile?.username ?? '';
      });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
