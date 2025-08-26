// src/app/core/services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakIdToken } from '../models/keycloak-id-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private keycloak = inject(KeycloakService);

  /** Force login */
  login(): void {
    this.keycloak.login({ redirectUri: window.location.origin });
  }

  /** Force logout */
  logout(redirectUri: string = window.location.origin): void {
    this.keycloak.logout(redirectUri);
  }

  /** Check if user is logged in */
  async isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  /** Get current username */
  getUsername(): string | undefined {
    const profile = this.keycloak.getKeycloakInstance()
      .idTokenParsed as KeycloakIdToken;
      
    return profile?.preferred_username;
  }

  /** Get user roles */
  getUserRoles(): string[] {
    return this.keycloak.getUserRoles();
  }

  /** Get the raw access token */
  async getToken(): Promise<string> {
    return this.keycloak.getToken();
  }
}
