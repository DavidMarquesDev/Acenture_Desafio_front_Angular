import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { FornecedorComponent } from './pages/fornecedor/fornecedor.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Interceptor } from './interceptor/interceptor';
import { AddEmpresasComponent } from './pages/add-empresas/add-empresas.component';
import { AddFornecedoresComponent } from './pages/add-fornecedores/add-fornecedores.component';

const serviceAutentica = [Interceptor]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    EmpresasComponent,
    NavbarComponent,
    HomeComponent,
    FornecedorComponent,
    AddEmpresasComponent,
    AddFornecedoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
 
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [

    serviceAutentica,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }