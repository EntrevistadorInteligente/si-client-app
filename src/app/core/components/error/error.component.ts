import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

  @Input() error: HttpErrorResponse | null = null;

  constructor() { }

  getErrorCode(): number | null {
    return this.error?.status || null;
  }

  getErrorMessage(): string | null {
    return this.error?.message || null;
  }
}
