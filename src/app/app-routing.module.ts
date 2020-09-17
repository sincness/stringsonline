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
import { KassenComponent } from './pages/kassen/kassen.component';
import { ProduktComponent } from './pages/produkt/produkt.component';
import { TakComponent } from './pages/tak/tak.component';
import { BuyGuard } from './guards/buy.guard';
import { CartGuard } from './guards/cart.guard';


const routes: Routes = [
  { path: '', redirectTo: 'forside', pathMatch: 'full' },
  { path: 'forside', component: ForsideComponent, data: { title: 'Forside' } },
  { path: 'vilkår', component: TermsComponent, data: { title: 'Salgs- og handelsbetingelser' } },
  { path: 'ordrehistorik', canActivate: [AuthGuard], component: HistorikComponent, data: { title: 'Ordrehistorik' } },
  { path: 'tak/:id', canActivate: [AuthGuard, BuyGuard], component: TakComponent, data: { title: 'Tak for din bestilling' } },
  { path: 'indkøbskurv', canActivate: [AuthGuard], component: KurvComponent, data: { title: 'Indkøbskurv' } },
  { path: 'kassen', canActivate: [AuthGuard, CartGuard], component: KassenComponent, data: { title: 'Kassen' } },
  { path: 'login', component: LoginComponent, data: { title: 'Log ind' } },
  { path: 'søg', component: ResultComponent, data: { title: 'Søg' }, pathMatch: 'full' },
  { path: 'søg/:keyword', component: ResultComponent, data: { title: 'Søgeresultat' }, pathMatch: 'full' },
  { path: 'produkter/:title/:id', component: ProdukterComponent, data: { title: ' produkter' }, pathMatch: 'full' },
  { path: 'produkt/:title/:type/:id', component: ProduktComponent, data: { title: ' produkt' }, pathMatch: 'full' },
  { path: 'produkt/:title/:id', component: ProduktComponent, data: { title: ' produkt' }, pathMatch: 'full' },
  { path: 'brands/:id', component: BrandsComponent, data: { title: ' brand' }, pathMatch: 'full' },
  { path: '**', component: FejlComponent, data: { title: 'Fejl'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
