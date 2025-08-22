export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8765', // API Gateway
  keycloak: {
    url: 'http://localhost:8085', // Keycloak base (no /realms)
    realm: 'app-mflibrary',
    clientId: 'mflibrary-frontend', // public client
  },
};
