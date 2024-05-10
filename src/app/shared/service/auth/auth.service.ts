import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  constructor(private keycloakService: KeycloakService,
    private http: HttpClient
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

  getToken() {
    return this.keycloakService.getToken()['__zone_symbol__value'];
  }

}
