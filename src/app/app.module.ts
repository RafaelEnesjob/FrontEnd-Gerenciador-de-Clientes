import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { ClienteFormModule } from './shared/components/cliente-form/cliente-form.module';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './pages/clientes/cliente.service';


@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    ClienteFormModule,
    HttpClientModule,
   
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
