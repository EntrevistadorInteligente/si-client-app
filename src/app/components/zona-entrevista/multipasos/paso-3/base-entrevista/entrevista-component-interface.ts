export interface EntrevistaComponentInterface {
    initializeInterview(): void;
    handleUserResponse(response: string): void;
    showNextQuestion(): void;
    finalizeInterview(): void;
  }