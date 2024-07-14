import { KeycloakOptions, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<boolean> {
  
  const urlBase = environment.urlBase;
  const options: KeycloakOptions = {
    config: {
      url: urlBase,
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
