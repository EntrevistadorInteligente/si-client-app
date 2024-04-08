export class PreguntasDto {
    userAnswer: string;
    text: string;
    constructor(
        userAnswer: string = '',
        text: string = '') {
        this.userAnswer = userAnswer;
        this.text = text;
    }
}
