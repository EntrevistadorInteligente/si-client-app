import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService extends KeycloakAuthGuard {
  override router: Router;
  override keycloakAngular: KeycloakService
  constructor(router: Router, keycloakAngular: KeycloakService) 
  {
    super(router, keycloakAngular)
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return new Promise(async (resolve, reject) => {
      if(!this.authenticated)
      {
        this.keycloakAngular.login();
        resolve(false);
        return;
      }

      const requiredRoles = route.data.roles;
      let granted: boolean = false;

      if(!requiredRoles || requiredRoles.length === 0)
      {
        granted = true;
      }        
      else
      {
        for(const requiredRole of requiredRoles)
        {
          if(this.roles.indexOf(requiredRole) > -1)
          {
            granted = true;
            break;
          }
        }
      }
      resolve(granted);
    })
  }
}
