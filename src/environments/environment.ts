// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
    // OAUTH MODULE -- DEL APP MODULE
    urlBase: 'https://keycloak.pruebas-entrevistador-inteligente.site/',

    // INTEGRADOR SERVICE
    orquestadorURL: 'https://gateway.pruebas-entrevistador-inteligente.site/api/orquestador/v1',
  
    // FEEDBACK SERVICE
    feedbackURL: 'https://gateway.pruebas-entrevistador-inteligente.site/api/administrador-entrevista/v1',
  
    // FEEDBACK SERVICE
    notifcacionesURL: 'https://gateway.pruebas-entrevistador-inteligente.site/api/notificaciones/v1',
        // FEEDBACK SERVICE
    chatURL: 'https://gateway.pruebas-entrevistador-inteligente.site/api/chats/v1',

    landingApp: 'https://www.pruebas-entrevistador-inteligente.site/es/pagina-principal/',

    previewKey: 'a@C+n[U3]P!I,6U',
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
