import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '@core/service/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loaderService.showLoader();

    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }
}
