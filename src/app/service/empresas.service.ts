import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { EmpresaViewModel } from "../models/EmpresaViewModel/EmpresaViewModel";
import { CepViewModel } from "../models/CepViewModel/CepViewModel";


@Injectable({
    providedIn: "root",
  })


export class EmpresaService
{
    private readonly baseUrl = environment["endPoint"];

    constructor(private httpClient: HttpClient) {}


    ListarEmpresas() {
        return this.httpClient.get<any>(
          `${this.baseUrl}/ListarEmpresa/`
        );
      }

      AdcionarEmpresa(empresa:EmpresaViewModel) {
        return this.httpClient.post<any>(
          `${this.baseUrl}/AdcionarEmpresa/`,
          empresa
        );
      }

      AdicionarCep(cep:CepViewModel) {
        return this.httpClient.post<any>(
          `${this.baseUrl}/AdicionarCep/`,
          cep
        );
      }
      

      BuscarCep(cep:CepViewModel) {
        return this.httpClient.get<any>(
          `${this.baseUrl}/BuscarCep/`,
        );
      }

}