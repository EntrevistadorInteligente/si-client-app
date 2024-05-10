import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService) { }

  getLoggedUser() {
    try {
      let userDetails = this.keycloakService.getKeycloakInstance().idTokenParsed;
      console.log(userDetails);
      console.log(this.getRoles());
      return userDetails;
    }
    catch(e) {
      console.error(e);
      return undefined;
    }
  }

  isLoggedIn() {
    return this.keycloakService.getKeycloakInstance().authenticated;
  }

  logout() {
    this.keycloakService.logout();
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

}
