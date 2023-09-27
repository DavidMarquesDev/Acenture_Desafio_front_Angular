import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { FornecedorViewModel } from "../models/FornecedorViewModel/FornecedorViewModel";
import { CepViewModel } from "../models/CepViewModel/CepViewModel";


@Injectable({
    providedIn: "root",
  })


export class FornecedorService
{
    private readonly baseUrl = environment["endPoint"];

    constructor(private httpClient: HttpClient) {}


    ListarFornecedor() {
        return this.httpClient.get<any>(
          `${this.baseUrl}/ListarFornecedor/`
        );
      }
      

      AdcionarFornecedor(fornecedor:FornecedorViewModel) {
        return this.httpClient.post<any>(
          `${this.baseUrl}/AdcionarFornecedor/`,
          fornecedor
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