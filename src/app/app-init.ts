import { KeycloakOptions, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<boolean> {
  const options: KeycloakOptions = {
    config: {
      url: 'http://localhost:8080',
      realm: 'entrevistador',
      clientId: 'front',
    },
    loadUserProfileAtStartUp: true,
    initOptions: {
      onLoad: 'check-sso',
      checkLoginIframe: true,
    },
    bearerExcludedUrls: [],
  };

  return () => keycloak.init(options);
}
