import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HeaderComponent } from "./components/header/header/header.component";
import { ContentComponent } from "./components/layout/content/content.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

import { NavService } from "./services/nav.service";
import { RouterModule } from "@angular/router";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { TapToTopComponent } from "./components/tap-to-top/tap-to-top.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NotificationComponent } from "./components/header/header/notification/notification.component";
import { AccountComponent } from "./components/header/header/account/account.component";
import { ModeComponent } from "./components/header/header/mode/mode.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoaderComponent } from "./components/loader/loader.component";
import { FullComponent } from "./components/layout/full/full.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import { DecimalPipe } from "@angular/common";
import { SearchComponent } from "./components/header/header/search/search.component";
import { SearchCustomizeComponent } from "./components/header/header/search-customize/search-customize.component";
import { FeedbackService } from "./services/domain/feedback.service";
import { IntegradorService } from "./services/domain/integrador.service";
import { LocaldataService } from "./services/domain/localdata.service";
import { ChatService } from "./services/chat/chat.service";
import { LoaderHttpComponent } from "./components/loader-http/loader-http.component";
import { ChatBotService } from "./services/domain/chat-bot.service";
import { EntrevistaService } from "./services/domain/entrevista.service";
import { MaximizeService } from "./services/domain/maximize.service";

@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    SidebarComponent,
    BreadcrumbComponent,
    TapToTopComponent,
    FooterComponent,
    NotificationComponent,
    AccountComponent,
    ModeComponent,
    LoaderComponent,
    LoaderHttpComponent,
    FullComponent,
    SearchComponent,
    SearchCustomizeComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbModule, AngularSvgIconModule.forRoot()],
  providers: [NavService, DecimalPipe, IntegradorService, FeedbackService, LocaldataService, 
    ChatService, ChatBotService,EntrevistaService, MaximizeService],
  exports: [RouterModule, 
    BreadcrumbComponent, 
    TapToTopComponent, 
    ContentComponent, 
    LoaderComponent,
    LoaderHttpComponent,
    NgbModule, 
    AngularSvgIconModule]

})
export class SharedModule {}
