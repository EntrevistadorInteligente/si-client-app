export class FeedbackComentarioDto {
  idPregunta: string;
  feedback: string;
  pregunta: string;
  respuesta: string;
}

export class FeedbackDto {
  idEntrevista: string;
  procesoEntrevista: FeedbackComentarioDto[];
}

export class FeedBackPruebaDto {
  perfil: string;
  procesoEntrevista: FeedbackComentarioDto[];
}
