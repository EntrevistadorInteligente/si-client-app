import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login() {
    throw new Error('Method not implemented.');
  }
  logout() {
    throw new Error('Method not implemented.');
  }
  getUsername() {
    return "";
  }
  getToken() {
    return "";
  }

  
  private isLoggedSubject = new BehaviorSubject<boolean>(false);

  constructor() {

  }

  get isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  setIsLogged(isLogged: boolean) {
    return this.isLoggedSubject.next(isLogged);
  }


}

