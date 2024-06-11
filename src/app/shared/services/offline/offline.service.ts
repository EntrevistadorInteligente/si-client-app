import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OfflineService {

  private online: boolean = true;
  private offlineMessageSubject: Subject<string> = new Subject();

  constructor() {}

  get getOnline(): boolean {
    return this.online;
  }

  get offlineMessage$(): Observable<string> {
    return this.offlineMessageSubject.asObservable();
  }

  handleOfflineRequest(request: HttpRequest<any>): Observable<any> {
    this.online = false;
    this.offlineMessageSubject.next('¡Ups parece que tenemos problemas!.');
    return of(null);
  }
}
