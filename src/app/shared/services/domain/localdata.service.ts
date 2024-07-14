import { Injectable } from '@angular/core';
import { FeedbackComentarioDto } from '../../model/feedback-dto';

@Injectable()
export class LocaldataService {
  private localStorageKey = 'preguntasMuestrasCache';
  private cacheDurationDays = 30;

  constructor() {}

  public saveToLocalStorage(
    perfil: string,
    data: FeedbackComentarioDto[]
  ): void {
    if (data && data.length > 0) {
      const cache = this.getCacheFromLocalStorage();
      cache[perfil] = {
        data,
        timestamp: new Date().getTime(), // Guardar la fecha actual en milisegundos
      };
      localStorage.setItem(this.localStorageKey, JSON.stringify(cache));
    }
  }

  public getCacheFromLocalStorage(): {
    [key: string]: { data: FeedbackComentarioDto[]; timestamp: number };
  } {
    const cache = localStorage.getItem(this.localStorageKey);
    return cache ? JSON.parse(cache) : {};
  }

  public isCacheExpired(timestamp: number): boolean {
    const cacheDate = new Date(timestamp);
    const currentDate = new Date();
    const diffInDays =
      (currentDate.getTime() - cacheDate.getTime()) / (1000 * 3600 * 24);
    return diffInDays > this.cacheDurationDays;
  }
}
