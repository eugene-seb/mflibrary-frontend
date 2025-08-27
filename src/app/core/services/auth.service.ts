import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';

import { UserProfile } from '../models/user-profile';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private keycloak = inject(KeycloakService);

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
      const roles = this.keycloak.getUserRoles(true);
      this._roles$.next(roles);
    }
  }

  /** Force login */
  login(): void {
    this.keycloak.login({ redirectUri: window.location.origin });
  }

  /** Force logout */
  logout(redirectUri: string = window.location.origin): void {
    this.keycloak.logout(redirectUri);
  }

  /** Get the raw access token */
  async getToken(): Promise<string> {
    return this.keycloak.getToken();
  }
}
