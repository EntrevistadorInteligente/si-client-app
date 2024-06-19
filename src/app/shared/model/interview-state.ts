export class InterviewState {
  step: number;
  isIntermediate: boolean;
  loadingMessage: string;

  constructor(step: number, isIntermediate: boolean, loadingMessage: string) {
    this.step = step;
    this.isIntermediate = isIntermediate;
    this.loadingMessage = loadingMessage;
  }
}
