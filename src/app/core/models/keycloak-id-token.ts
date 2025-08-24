/**
 * A user's representation from keycloak
 */
export interface KeycloakIdToken {
  preferred_username?: string;
  email?: string;
  name?: string;
}
