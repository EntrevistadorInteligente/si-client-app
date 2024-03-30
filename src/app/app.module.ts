import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { LandingModule } from './landing/landing.module';
import { IntegradorService } from '@shared/service/integrador.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptor } from '@core/interceptors/LoaderInterceptor';
import { OfflineInterceptor } from '@core/interceptors/OfflineInterceptor';
import { HttpErrorInterceptor } from '@core/interceptors/HttpErrorInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    LandingModule,
    SharedModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8765/api/*'],
        sendAccessToken: true
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    IntegradorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OfflineInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
