export const environment = {

  production: false,

  // OAUTH MODULE -- DEL APP MODULE
  oauthModuleUrl: 'http://localhost:8765/api/*',

  // URL ALERTSERVICE
  urlOrquestador: 'http://localhost:8765/api/orquestador/v1/eventos/subscribe',
  urlFeedback: 'http://localhost:8765/api/feedback/v1/eventos/subscribe',

  // URL FEEDBACKSERVICE
  urlFeedbackService: 'http://localhost:8765/api/feedback/v1/',
  urlFeedbackMsg: 'http://localhost:8765/api/ms2/',

  // URL INTEGRADORSERVICE
  urlEntrevistador: 'http://localhost:8765/api/orquestador/v1/entrevistador/',
  urlMsgEntrevistador: 'http://localhost:8765/api/ms2/',

  // SSE SERVICE
  sseUrlOrquestador: 'http://localhost:8765/api/orquestador/v1/eventos/subscribe',
  sseUrlFeedback: 'http://localhost:8765/api/administrador-entrevista/v1/eventos/subscribe',

  // DIRECCI�N IP DEL SERVIDOR
  SERVER_IP_ADDRESS: '192.168.1.100',

  // INTEGRADOR SERVICE
  orquestadorURL: 'http://localhost:8765/api/orquestador/v1',

  // FEEDBACK SERVICE
  feedbackURL: 'http://localhost:8765/api/administrador-entrevista/v1',
};
