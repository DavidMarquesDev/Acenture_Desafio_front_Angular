import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: "root",
  })


export class CepService
{
    private readonly baseUrl = environment["endPoint"];

    constructor(private httpClient: HttpClient) {}


    BuscarCep(empresaId: string) {
        return this.httpClient.get<any>(
            `${this.baseUrl}/BuscarCep/${empresaId}`
        );
      }
}