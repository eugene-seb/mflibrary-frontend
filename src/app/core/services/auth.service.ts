import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';

import { UserProfile } from '../models/user-profile';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private keycloak = inject(KeycloakService);
  private refreshInterval!: ReturnType<typeof setInterval>;

  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private _profile$ = new BehaviorSubject<UserProfile | null>(null);
  private _roles$ = new BehaviorSubject<string[]>([]);

  isAuthenticated$ = this._isAuthenticated$.asObservable();
  profile$ = this._profile$.asObservable();
  roles$ = this._roles$.asObservable();

  async init(): Promise<void> {
    const loggedIn = await this.keycloak.isLoggedIn();
    this._isAuthenticated$.next(loggedIn);

    if (loggedIn) {
      const profile = await this.keycloak.loadUserProfile();
      this._profile$.next(profile);
      const roles = await this.keycloak.getUserRoles(true);
      this._roles$.next(roles);

      this.refreshToken();
    }
  }

  /**
   * Auto-refresh the token every 10 seconds.
   */
  refreshToken() {
    const refresh = async () => {
      try {
        const refreshed = await this.keycloak.updateToken(30); // refresh if expiring in 30s
        if (refreshed && !environment.production) {
          console.log('Token refreshed');
        }
      } catch (err) {
        if (!environment.production) {
          console.error('Failed to refresh token', err);
        }
        this.logout();
        return;
      }
      this.refreshInterval = setInterval(refresh, 10000);
    };
    refresh();
  }

  /** Force login */
  login(): void {
    this.keycloak.login({ redirectUri: window.location.origin });
  }

  /** Force logout */
  logout(redirectUri: string = window.location.origin): void {
    clearInterval(this.refreshInterval);
    this.keycloak.logout(redirectUri);
    this._isAuthenticated$.next(false);
    this._profile$.next(null);
    this._roles$.next([]);
  }

  /** Get the raw access token */
  async getToken(): Promise<string> {
    return this.keycloak.getToken();
  }
}
