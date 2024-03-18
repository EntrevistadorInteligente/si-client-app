import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeModule } from '@home/home.module';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    ContactoComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forRoot(routes)
  ],
  exports: [MenuComponent, ContactoComponent, FooterComponent],
  providers: [],
})

export class SharedModule { }

