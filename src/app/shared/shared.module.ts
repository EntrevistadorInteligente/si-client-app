import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeModule } from '@home/home.module';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { ContactoComponent } from './contacto/contacto.component';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    ContactoComponent
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

