import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/service/empresas.service';
import { CepService } from 'src/app/service/cep.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  constructor(private empresaService: EmpresaService,
    private cepService: CepService,
    private router: Router,
  private httpClient: HttpClient) { }

  empresas!: any;

  // Função para formatar CNPJ
  formatarCnpj(cnpj: string): string {
    return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`;
  }


  ngOnInit(): void {
    this.ListarEmpresas();
  }


  ListarEmpresas() {
    this.empresaService.ListarEmpresas()
      .subscribe(async empresas => {
        for (const empresa of empresas) {
          try {
            if (empresa.empresaId) {
              const cep = await this.BuscarCep(empresa.empresaId);
              empresa.rua = cep[0].rua;
              empresa.bairro = cep[0].bairro;
              empresa.cidade = cep[0].cidade;
              empresa.estado = cep[0].estado;
            }
          } catch (error) {
            console.error(error);
          }
        }
        this.empresas = empresas;
      },
      error => {
        this.router.navigate(["/login"]);
      })
  }

  async BuscarCep(empresaId: string) {
    try {
      const cep = await this.httpClient.get(`http://localhost:5208/api/BuscarCep/${empresaId}`).toPromise();
      return cep as any; // Certifique-se de ajustar o tipo de retorno conforme necessário
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}