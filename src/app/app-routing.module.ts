import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { content } from "./shared/routes/routes/routers";
import { FullComponent } from './shared/components/layout/full/full.component';
import { full } from './shared/routes/full';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/zona-entrevista',
    pathMatch: 'full' 
  },
  {
    path: '',
    redirectTo: '/zona-entrevista',
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
    redirectTo: '/zona-entrevista'
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
