import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlertComponent } from './components/alert/alert.component';
import { DragComponent } from './components/drag/drag.component';
import { FormEmpresaComponent } from './components/form-empresa/form-empresa.component';

@NgModule({
  declarations: [
    ContactoComponent,
    LoaderComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    AlertComponent,
    DragComponent,
    FormEmpresaComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ContactoComponent,
    LoaderComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    AlertComponent,
    DragComponent,
  ],
})

export class CoreModule { }
