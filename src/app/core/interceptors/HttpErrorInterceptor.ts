import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '@core/service/error/errorservice.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private errorService: ErrorService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.setError(error);
        if (error.status === 404) {
          this.router.navigate(['error-404']);
        } else if (error.status === 403) {
          this.router.navigate(['error-403']);
        } else if (error.status === 500) {
          this.router.navigate(['error-500']);
        }
        return throwError(error);
      })
    );
  }
}
