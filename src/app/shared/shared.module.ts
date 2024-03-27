// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTES
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MenuComponent,
    FooterComponent
  ],
  providers: [],
})

export class SharedModule { }
