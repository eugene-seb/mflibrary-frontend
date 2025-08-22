import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideKeycloak,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  includeBearerTokenInterceptor,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
} from 'keycloak-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment.development';

// Define which API routes should get the Bearer token
/**
 * Creates an interceptor condition for including a bearer token in API requests.
 *
 * The condition matches requests whose URLs start with the configured API base URL
 * and ensures the 'Authorization' header uses the 'Bearer' prefix.
 *
 * @remarks
 * Uses a regular expression to match the API base URL and applies the bearer token
 * condition for authentication.
 *
 * @see {@link createInterceptorCondition}
 * @see {@link IncludeBearerTokenCondition}
 *
 * @example
 * // Used to automatically attach bearer tokens to requests matching the API base URL.
 */
const apiCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: new RegExp(`^${environment.apiBaseUrl}`),
  bearerPrefix: 'Bearer',
});

/**
 * Application configuration object for the Angular app.
 *
 * @remarks
 * This configuration sets up core providers including zone change detection,
 * HTTP client with interceptors, routing, and Keycloak authentication.
 *
 * @property {Array} providers - List of providers for dependency injection.
 * - `provideZoneChangeDetection`: Enables zone change detection with event coalescing.
 * - `provideHttpClient`: Configures HTTP client with a bearer token interceptor.
 * - `provideRouter`: Sets up application routes.
 * - `provideKeycloak`: Initializes Keycloak authentication with specified options.
 * - `INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG`: Supplies configuration for the bearer token interceptor.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideRouter(routes),
    provideKeycloak({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: 'login-required',
        pkceMethod: 'S256',
        checkLoginIframe: false,
        redirectUri: window.location.origin,
      },
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [apiCondition],
    },
  ],
};

