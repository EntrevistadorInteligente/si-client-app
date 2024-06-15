import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  private tokenExpiryTime: number;

  constructor(private keycloakService: KeycloakService) {
    this.scheduleTokenRefresh();
  }

  private scheduleTokenRefresh(): void {
    const token = this.keycloakService.getKeycloakInstance()?.tokenParsed;
    if (token && token.exp) {
      this.tokenExpiryTime = token.exp * 1000;
      const expiresIn = this.tokenExpiryTime - Date.now();
      setTimeout(() => this.refreshToken(), expiresIn - 60000); // Refresh 1 minute before expiry
    }
  }

  private async refreshToken(): Promise<void> {
    try {
      await this.keycloakService.updateToken(70); // Refresh if token will expire in 70 seconds
      this.scheduleTokenRefresh();
    } catch (error) {
      console.error('Failed to refresh token', error);
      this.logout();
    }
  }


  getLoggedUser() {
    try {
      let userDetails = this.keycloakService.getKeycloakInstance().idTokenParsed;
      console.log(userDetails);
      return userDetails;
    }
    catch(e) {
      console.error(e);
      return undefined;
    }
  }

  getUsername() {
    return this.keycloakService.getUsername();
  }

  isLoggedIn() {
    return this.keycloakService.getKeycloakInstance().authenticated;
  }

  redirectToProfile() {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  login(): void {
    this.keycloakService.login();
  }

  get isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  setIsLogged(isLogged: boolean) {
    return this.isLoggedSubject.next(isLogged);
  }

  async logout() {
    await this.keycloakService.logout();
    this.isLoggedSubject.next(false);
  }

  async getToken() {
    try {
      const token = await this.keycloakService.getToken();
      console.info('token', token);
      return token;
    } catch (error) {
      console.error('Failed to get token', error);
      throw error;
    }
  }
}
