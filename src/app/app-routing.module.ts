import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { HomeComponent } from './pages/home/home.component';
import { FornecedorComponent } from './pages/fornecedor/fornecedor.component';
import { AddEmpresasComponent } from './pages/add-empresas/add-empresas.component';
import { AddFornecedoresComponent } from './pages/add-fornecedores/add-fornecedores.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  }
  ,
  {
    path: "login", component: LoginComponent
  },
  {
    path: "empresas", component: EmpresasComponent
  },
  {
    path: "AdcionarEmpresa", component: AddEmpresasComponent
  },
  {
    path: "fornecedor", component: FornecedorComponent
  },
  {
    path: "AdcionarFornecedor", component: AddFornecedoresComponent
  },
  {
    path: "home",  component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }