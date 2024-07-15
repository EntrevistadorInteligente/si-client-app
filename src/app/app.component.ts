import { Component, HostBinding, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { OfflineService } from './shared/services/offline/offline.service';
import { NetworkService } from './shared/services/network/network.service';
import { filter } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLogged: boolean;
  isAdmin: boolean;
  online: boolean = true;
  offlineMessage: string = '';

   /*constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService,
    private networkService: NetworkService,
    private offlineService: OfflineService,
    private keycloakService: KeycloakService,
    private authService:AuthService) {
    
  }
 ngOnInit(): void {
    this.networkService.online$.subscribe((online: any) => {
      this.online = online;
      if (online) {
        this.offlineMessage = '';
      }
    });

    this.offlineService.offlineMessage$.subscribe((message: any) => {
      this.offlineMessage = message;
    });

    this.checkLogin();
    this.subscribeToLoginChanges();
  }

  private checkLogin() {
    try {
      const isLoggedIn = this.keycloakService.isLoggedIn();
      
      if (isLoggedIn) {
        const isTokenExpired = this.keycloakService.isTokenExpired();
        this.isLogged = !isTokenExpired;
      } else {
        this.isLogged = false;
      }
      
      this.authService.setIsLogged(this.isLogged);
    } catch (error) {
      console.error('Error checking login status:', error);
      this.isLogged = false;
      this.authService.setIsLogged(this.isLogged);
    }

    private subscribeToLoginChanges(): void {
    this.authService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }
  }*/
    constructor(private oauthService: OAuthService,
      private authService: AuthService
    ) {
      this.oauthService.configure(authCodeFlowConfig);
      this.oauthService.loadDiscoveryDocumentAndLogin();
  
      // Automatically load user profile
      this.oauthService.events
        .pipe(filter((e) => e.type === 'token_received'))
        .subscribe((_) => this.oauthService.loadUserProfile());
    }
  
    get userName(): string {
      const claims = this.oauthService.getIdentityClaims();
      return claims?.['given_name'] ?? '';
    }
  
    get idToken(): string {
      return this.oauthService.getIdToken();
    }
  
    get accessToken(): string {
      return this.oauthService.getAccessToken();
    }
  
    refresh() {
      this.oauthService.refreshToken();
    }

    private subscribeToLoginChanges(): void {
      this.authService.isLogged$.subscribe((isLogged) => {
        this.isLogged = isLogged;
      });
    }


  @HostBinding('@.disabled')
  public animationsDisabled = false;

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }


  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }

  
}
