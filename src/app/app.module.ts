import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import { OverlayModule } from "@angular/cdk/overlay";
import { LoadingBarModule } from "@ngx-loading-bar/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { initializer } from "./app-init";
import { LoaderInterceptor } from "./shared/components/interceptors/LoaderInterceptor";
import { HttpErrorInterceptor } from "./shared/components/interceptors/HttpErrorInterceptor";
import { OfflineInterceptor } from "./shared/components/interceptors/OfflineInterceptor";
import { TermsAndConditionsComponent } from "./components/terms-and-conditions/terms-and-conditions.component";
import { OAuthModule } from "angular-oauth2-oidc";



@NgModule({
  declarations: [AppComponent,TermsAndConditionsComponent],
  imports: [
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule, 
    AppRoutingModule, 
    RouterModule, 
    SharedModule, 
    OverlayModule, 
    LoadingBarModule, 
    BrowserAnimationsModule, 
    HttpClientModule,
    OAuthModule.forRoot()],
    providers: [
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
      }
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
