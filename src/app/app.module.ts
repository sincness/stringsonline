import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForsideComponent } from './pages/forside/forside.component';
import { FejlComponent } from './pages/fejl/fejl.component';
import { KurvComponent } from './pages/kurv/kurv.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HeaderComponent } from './partials/header/header.component';
import { HistorikComponent } from './pages/historik/historik.component';
import { TakComponent } from './pages/tak/tak.component';
import { NavigationComponent } from './partials/navigation/navigation.component';
import { KassenComponent } from './pages/kassen/kassen.component';
import { TermsComponent } from './pages/terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    ForsideComponent,
    FejlComponent,
    KurvComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    HistorikComponent,
    TakComponent,
    NavigationComponent,
    KassenComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
