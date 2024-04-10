import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfflineService } from '@core/service/offline/offline.service';

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {

  constructor(private offlineService: OfflineService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.offlineService.getOnline) {
      return this.offlineService.handleOfflineRequest(request);
    }
    return next.handle(request);
  }
}
