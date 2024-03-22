// MODULOS
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';

// COMPONENTES
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeModule } from '@home/home.module';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    HomeModule,
  ],
  exports: [
    MenuComponent,
    FooterComponent
  ],
  providers: [],
})

export class SharedModule { }

