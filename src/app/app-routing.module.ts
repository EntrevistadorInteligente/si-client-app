import  { NgModule } from '@angular/core';var routingAnimation = localStorage.getItem('animate') 
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { content } from "./shared/routes/routes/routers";
import { FullComponent } from './shared/components/layout/full/full.component';
import { full } from './shared/routes/full';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full' 
  },
  {
    path: '',
    component: ContentComponent,
    children: content
  },
  {
    path: '',
    component: FullComponent,
    children: full
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
