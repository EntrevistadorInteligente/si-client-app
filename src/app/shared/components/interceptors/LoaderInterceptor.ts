// loader.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../services/domain/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private readonly delay = 1000; // 1 segundo

  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let loaderTimeout: any;

    const handle = next.handle(req).pipe(
      finalize(() => {
        clearTimeout(loaderTimeout);
        this.loaderService.hide();
      })
    );

    loaderTimeout = setTimeout(() => {
      this.loaderService.show();
    }, this.delay);

    return handle;
  }
}
