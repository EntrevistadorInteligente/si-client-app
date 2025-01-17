import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  private tokenExpiryTime: number;

  constructor(private keycloakService: KeycloakService) {

  }

  public scheduleTokenRefresh(): void {
    const token = this.keycloakService.getKeycloakInstance()?.tokenParsed;
    if (token && token.exp) {
      this.tokenExpiryTime = token.exp * 1000;
      const expiresIn = this.tokenExpiryTime - Date.now();
      if (expiresIn < 60000) {
        this.refreshToken();
      }
      
    }
  }

  public async refreshToken(): Promise<void> {
    try {
      await this.keycloakService.updateToken(70);
    } catch (error) {
      console.error('Failed to refresh token', error);
      this.logout();
    }
  }


  getLoggedUser() {
    try {
      let userDetails = this.keycloakService.getKeycloakInstance().idTokenParsed;
      return userDetails;
    }
    catch(e) {
      console.error(e);
      return undefined;
    }
  }

  getEmail() {
    return this.keycloakService.getUsername();
  }

  getFirstGivenName() {
    const loggedUser = this.getLoggedUser();
    if (loggedUser && loggedUser['given_name']) {
      const firstName = loggedUser['given_name'].split(' ')[0];
      return firstName;
    }
    return undefined;
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
    this.keycloakService.login({
      redirectUri: window.location.origin + '/es/entrevistas/zona-entrevista'
    }).then(() => {
        this.isLoggedSubject.next(true);
    }).catch(error => {
      console.error('Error durante el login:', error);
    });
  }

  isTokenExpired() {
    return this.keycloakService.isTokenExpired();
  }

  get isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  setIsLogged(isLogged: boolean) {
    return this.isLoggedSubject.next(isLogged);
  }

  async logout() {
    this.keycloakService.logout(environment.landingApp).then(() => {
        this.isLoggedSubject.next(false);
    }).catch(error => {
      console.error('Error durante el login:', error);
    });
   
  }

  async getToken() {
    try {
      const token = await this.keycloakService.getToken();
      return token;
    } catch (error) {
      console.error('Failed to get token', error);
      throw error;
    }
  }
}
