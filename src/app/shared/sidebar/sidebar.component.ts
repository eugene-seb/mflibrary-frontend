import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  private authService: AuthService = inject(AuthService);

  async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
