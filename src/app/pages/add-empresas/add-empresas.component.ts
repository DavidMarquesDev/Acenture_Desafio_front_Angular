import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaViewModel } from 'src/app/models/EmpresaViewModel/EmpresaViewModel';
import { EmpresaService } from 'src/app/service/empresas.service';
import { HttpClient } from '@angular/common/http';
import { CepViewModel } from 'src/app/models/CepViewModel/CepViewModel';


@Component({
  selector: 'app-add-empresas',
  templateUrl: './add-empresas.component.html',
  styleUrls: ['./add-empresas.component.scss']
})
export class AddEmpresasComponent implements OnInit {

  empresaId!: number
  AddEmpresasForm!: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private EmpresaService: EmpresaService,
      private router: Router,
      private httpClient: HttpClient // Adicione esta linha
  ) { }

  ngOnInit(): void {
    this.AddEmpresasForm = this.formBuilder.group({
      cnpj: ['', Validators.required],
      nome: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required], // Campo Rua adicionado
      cidade: ['', Validators.required], // Campo Cidade adicionado
      bairro: ['', Validators.required], // Campo Bairro adicionado
      estado: ['', Validators.required] // Campo Estado adicionado
    });
  }

  buscarCEPViaApi() {
    const cepControl = this.AddEmpresasForm.get('cep');
    if (cepControl && cepControl.value && /^[0-9]{8}$/.test(cepControl.value)) {
        const cep = cepControl.value;
        this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`, { responseType: 'json' }).subscribe(
            (data: any) => {
                this.AddEmpresasForm.patchValue({
                    rua: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf
                });
            },
            error => {
                console.error(error);
                alert('Ocorreu um erro ao buscar o CEP. Por favor, tente novamente.');
            }
        );
    }
}



  submitAddEmpresa() {

    const dadosNovaEmpresa = this.AddEmpresasForm.getRawValue() as EmpresaViewModel;

    var Empresa = new EmpresaViewModel();
    Empresa.cnpj = dadosNovaEmpresa.cnpj;
    Empresa.nome = dadosNovaEmpresa.nome;
    Empresa.cep = dadosNovaEmpresa.cep;

    this.EmpresaService.AdcionarEmpresa(Empresa)
      .subscribe(novaEmpresa  => {
        const novaEmpresaId = novaEmpresa.empresaId;

        this.enviarDadosCep(novaEmpresaId);
        this.router.navigate(["/empresas"]);
      },
        error => {
          alert("Erro!")
        })


  }

  enviarDadosCep(empresaId: number) {

    const dadosNovoCep = this.AddEmpresasForm.getRawValue() as CepViewModel;

    var Cep = new CepViewModel();
    Cep.cepId = dadosNovoCep.cepId;
    Cep.empresaId = empresaId;
    Cep.fornecedorId = dadosNovoCep.fornecedorId;
    Cep.rua = dadosNovoCep.rua;
    Cep.bairro = dadosNovoCep.bairro;
    Cep.cidade = dadosNovoCep.cidade;
    Cep.estado = dadosNovoCep.estado;

    this.EmpresaService.AdicionarCep(Cep)
      .subscribe(erro => {

        this.router.navigate(["/empresas"]);
      },
        error => {
          alert("Erro!")
        })


  }
  

}