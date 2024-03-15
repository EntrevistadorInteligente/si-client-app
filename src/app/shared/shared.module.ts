// MODULOS
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { routes } from '../app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeModule } from '@home/home.module';

// COMPONENTES
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { LoginComponent } from './Components/login/login.component';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    ContactoComponent,
    RegistroComponent,
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
    RegistroComponent,
    LoginComponent],
  providers: [],
})

export class SharedModule { }

