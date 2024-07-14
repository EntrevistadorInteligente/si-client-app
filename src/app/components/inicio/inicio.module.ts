import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InicioRoutingModule } from "./inicio-routing.module";
import { HomeInterviewPreviewComponent } from "./home/home-interview-preview/home-interview-preview.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { InicioComponent } from "./inicio.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [InicioComponent, HomeComponent, HomeInterviewPreviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InicioRoutingModule,
    NgSelectModule,
    SharedModule,
  ],
})
export class InicioModule {}
