import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FornecedorService } from 'src/app/service/fornecedor.service';
import { CepService } from 'src/app/service/cep.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  constructor(private fornecedorService: FornecedorService,
    private cepService: CepService,
    private router: Router,
  private httpClient: HttpClient) { }

  fornecedor!: any; 

  // Função para formatar CNPJ
  formatarCnpj(cnpj: string): string {
    return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`;
  }


  ngOnInit(): void {
    this.ListarFornecedor();
  }


  ListarFornecedor() {
    this.fornecedorService.ListarFornecedor()
      .subscribe(async fornecedores => {
        for (const fornecedor of fornecedores) {
          try {
            if (fornecedor.fornecedorId) {
              const cep = await this.BuscarCep(fornecedor.fornecedorId);
              fornecedor.rua = cep[0].rua;
              fornecedor.bairro = cep[0].bairro;
              fornecedor.cidade = cep[0].cidade;
              fornecedor.estado = cep[0].estado;
            }
          } catch (error) {
            console.error(error);
          }
        }
        this.fornecedor = fornecedores;
      },
      error => {
        this.router.navigate(["/login"]);
      })
  }

  async BuscarCep(fornecedorId: string) {
    try {
      const cep = await this.httpClient.get(`http://localhost:5208/api/BuscarCep/${fornecedorId}`).toPromise();
      return cep as any; // Certifique-se de ajustar o tipo de retorno conforme necessário
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}