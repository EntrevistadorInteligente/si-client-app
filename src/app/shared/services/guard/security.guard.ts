import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export const canActivate: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.scheduleTokenRefresh();  
  return authService.isLogged$.pipe(
    map((isLogged: boolean) => {
      if (isLogged) {
        return true;
      } else {
        return router.createUrlTree(['/es/entrevistas/inicio'], { queryParams: { redirected: 'true' } });
      }
    }),
    catchError(() => {
      return of(router.createUrlTree(['/es/entrevistas/inicio'], { queryParams: { redirected: 'true' } }));
    })
  );
};

export const canActivateChild: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => canActivate(route, state);
