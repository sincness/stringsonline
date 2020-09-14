import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForsideComponent } from './pages/forside/forside.component';
import { FejlComponent } from './pages/fejl/fejl.component';
import { KurvComponent } from './pages/kurv/kurv.component';
import { LoginComponent } from './pages/login/login.component';
import { TermsComponent } from './pages/terms/terms.component';


const routes: Routes = [
  { path: '', redirectTo: 'forside', pathMatch: 'full' },
  { path: 'forside', component: ForsideComponent, data: { title: 'Forside' } },
  { path: 'vilkår', component: TermsComponent, data: { title: 'Salgs- og handelsbetingelser' } },
  { path: 'kurv', component: KurvComponent, data: { title: 'Indkøbskurv' } },
  { path: 'login', component: LoginComponent, data: { title: 'Log ind' } },
  { path: '**', component: FejlComponent, data: { title: 'Fejl'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
