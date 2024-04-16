import { EntrevistaFeedbackDto } from "./entrevista-feedback-dto";

export class FeedbackDto {
    idEntrevista: string;
    procesoEntrevista: EntrevistaFeedbackDto[];
    constructor(
        idEntrevista: string = '',
        procesoEntrevista: []) {
        this.idEntrevista = idEntrevista;
        this.procesoEntrevista = procesoEntrevista;
    }
}
