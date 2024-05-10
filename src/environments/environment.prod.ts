export const environment = {

  production: true,

  // OAUTH MODULE -- DEL APP MODULE
  oauthModuleUrl: 'https://gateway.pruebas-entrevistador-inteligente.site/api/*',

  // URL ALERTSERVICE
  urlOrquestador: 'https://gateway.pruebas-entrevistador-inteligente.site/api/orquestador/v1/eventos/subscribe',
  urlFeedback: 'https://gateway.pruebas-entrevistador-inteligente.site/api/feedback/v1/eventos/subscribe',

  // URL FEEDBACKSERVICE
  urlFeedbackService: 'https://gateway.pruebas-entrevistador-inteligente.site/api/feedback/v1/',
  urlFeedbackMsg: 'https://gateway.pruebas-entrevistador-inteligente.site/api/ms2/',

  // URL INTEGRADORSERVICE
  urlEntrevistador: 'https://gateway.pruebas-entrevistador-inteligente.site/api/orquestador/v1/entrevistador/',
  urlMsgEntrevistador: 'https://gateway.pruebas-entrevistador-inteligente.site/api/ms2/',

  // SSE SERVICE
  sseUrlOrquestador: 'https://gateway.pruebas-entrevistador-inteligente.site/api/orquestador/v1/eventos/subscribe',
  sseUrlFeedback: 'https://gateway.pruebas-entrevistador-inteligente.site/api/administrador-entrevista/v1/eventos/subscribe',

  // DIRECCI�N IP DEL SERVIDOR
  SERVER_IP_ADDRESS: '192.168.1.100',

  // INTEGRADOR SERVICE
  orquestadorURL: 'https://gateway.pruebas-entrevistador-inteligente.site/api/orquestador',

  // FEEDBACK SERVICE
  feedbackURL: 'https://gateway.pruebas-entrevistador-inteligente.site/api/administrador-entrevista/v1',
};
