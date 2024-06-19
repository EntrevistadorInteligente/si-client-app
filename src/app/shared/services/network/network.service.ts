import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() {}

  get online$(): Observable<boolean> {
    return fromEvent(window, 'online').pipe(
      mergeMap(() => fromEvent(window, 'offline')),
      map(() => navigator.onLine)
    );
  }
}
