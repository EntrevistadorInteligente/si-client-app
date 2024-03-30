import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private error: HttpErrorResponse | null = null;

  constructor() { }

  setError(error: HttpErrorResponse): void {
    this.error = error;
  }

  getError(): HttpErrorResponse | null {
    return this.error;
  }
}
