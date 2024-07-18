import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OfflineService } from './shared/services/offline/offline.service';
import { NetworkService } from './shared/services/network/network.service';
import { filter } from 'rxjs/operators';
import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged: boolean;
  isAdmin: boolean;
  online: boolean = true;
  offlineMessage: string = '';

  constructor(
    private oauthService: OAuthService,
    private authService: AuthService,
  ) {
    this.configureOAuth();
  }

  private configureOAuth() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocument().then(()=> {
        this.authService.setIsLogged(true);
    });
    this.oauthService.events
    .pipe(filter((e) => e.type === 'token_received'))
    .subscribe((_) => {
      this.oauthService.loadUserProfile()
    });
    this.oauthService.setupAutomaticSilentRefresh();
  }

  ngOnInit(): void {
    this.subscribeToLoginChanges();
  }

  private subscribeToLoginChanges(): void {
    this.authService.isLogged$.subscribe(isLogged => {
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
