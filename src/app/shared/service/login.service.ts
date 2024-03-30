import { EventEmitter, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  authenticationChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private oauthService: OAuthService) { }

  public login(): void {
    this.oauthService.initImplicitFlowInternal();
    this.authenticationChanged.emit(true);
  }

  public logout(): void {
    this.oauthService.logOut();
    this.authenticationChanged.emit(false);
  }

  public getIsLogged(): boolean {
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public getUsername(): string {
    return this.oauthService.getIdentityClaims()[`preferred_username`];
  }

  public getIsAdmin(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
  }
}
