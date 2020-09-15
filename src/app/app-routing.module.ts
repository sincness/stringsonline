import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForsideComponent } from './pages/forside/forside.component';
import { FejlComponent } from './pages/fejl/fejl.component';
import { KurvComponent } from './pages/kurv/kurv.component';
import { LoginComponent } from './pages/login/login.component';
import { TermsComponent } from './pages/terms/terms.component';
import { AuthGuard } from './guards/auth.guard';
import { ResultComponent } from './pages/result/result.component';
import { ProdukterComponent } from './pages/produkter/produkter.component';
import { HistorikComponent } from './pages/historik/historik.component';
import { BrandsComponent } from './pages/brands/brands.component';


const routes: Routes = [
  { path: '', redirectTo: 'forside', pathMatch: 'full' },
  { path: 'forside', component: ForsideComponent, data: { title: 'Forside' } },
  { path: 'vilkår', component: TermsComponent, data: { title: 'Salgs- og handelsbetingelser' } },
  { path: 'ordrehistorik', canActivate: [AuthGuard], component: HistorikComponent, data: { title: 'Ordrehistorik' } },
  { path: 'kurv', canActivate: [AuthGuard], component: KurvComponent, data: { title: 'Indkøbskurv' } },
  { path: 'login', component: LoginComponent, data: { title: 'Log ind' } },
  { path: 'søg/:keyword', component: ResultComponent, data: { title: 'Søgeresultat' }, pathMatch: 'full' },
  { path: 'produkter/:id', component: ProdukterComponent, data: { title: ' produkter' }, pathMatch: 'full' },
  { path: 'brands/:id', component: BrandsComponent, data: { title: ' brand' }, pathMatch: 'full' },
  { path: '**', component: FejlComponent, data: { title: 'Fejl'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
