import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable, tap } from 'rxjs';
//import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  constructor(private keycloakService: KeycloakService,
    //private cookieService: CookieService,
  ) { }

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

  logout() {
    this.keycloakService.logout();
    this.isLoggedSubject.next(false);
    //this.cookieService.deleteAll();
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
