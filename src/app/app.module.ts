// MODULOS
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

// COMPONENTES
import { AppComponent } from './app.component';

// INTERCEPTORS
import { LoaderInterceptor } from '@core/interceptors/LoaderInterceptor';
import { OfflineInterceptor } from '@core/interceptors/OfflineInterceptor';
import { HttpErrorInterceptor } from '@core/interceptors/HttpErrorInterceptor';

// SERVICIOS
import { ErrorService } from '@core/service/error/errorservice.service';
import { LoaderService } from '@core/service/loader/loader.service';

// VARIABLES DE ENTORNO
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.oauthModuleUrl],
        sendAccessToken: true
      }
    }),
    ReactiveFormsModule,
  ],

  providers: [
    ErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OfflineInterceptor,
      multi: true
    },
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: 'SERVER_IP_ADDRESS',
      useValue: environment.SERVER_IP_ADDRESS
    },
  ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
