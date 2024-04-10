import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RutasNoVisiblesGuard implements CanActivate {

  canActivate(): boolean {
    return false;
  }
}
