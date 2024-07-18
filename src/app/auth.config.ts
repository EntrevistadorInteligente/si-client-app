import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://keycloak.pruebas-entrevistador-inteligente.site/realms/entrevistador',
  redirectUri: window.location.origin,
  clientId: 'front',
  responseType: 'code',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile email offline_access',
  sessionChecksEnabled: true,
};  