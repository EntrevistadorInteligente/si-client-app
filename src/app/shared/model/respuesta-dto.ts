export class RespuestaComentarioDto {
  idPregunta: string;
  respuesta: string;
}

export class RespuestaDto {
  idEntrevista: string;
  username: string;
  procesoEntrevista: RespuestaComentarioDto[];
}