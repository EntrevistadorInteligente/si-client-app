// MODULOS
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '@home/home.module';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    ContactoComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    MenuComponent,
    ContactoComponent,
    FooterComponent,
    LoginComponent
  ],
  providers: [],
})

export class SharedModule { }

