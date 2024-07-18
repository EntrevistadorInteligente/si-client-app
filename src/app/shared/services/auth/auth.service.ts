import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) { }

  login() {
    this.oauthService.initLoginFlow();
  }
  
  logout() {
    this.oauthService.revokeTokenAndLogout();
  }

  getUsername() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['email'];
  }

  getToken() {
    return this.oauthService.getAccessToken();
  }

  private isLoggedSubject = new BehaviorSubject<boolean>(false);

  get isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  setIsLogged(isLogged: boolean) {
    return this.isLoggedSubject.next(isLogged);
  }

}

