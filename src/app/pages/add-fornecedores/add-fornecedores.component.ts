import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FornecedorViewModel } from 'src/app/models/FornecedorViewModel/FornecedorViewModel';
import { FornecedorService } from 'src/app/service/fornecedor.service';
import { HttpClient } from '@angular/common/http';
import { CepViewModel } from 'src/app/models/CepViewModel/CepViewModel';


@Component({
  selector: 'app-add-fornecedores',
  templateUrl: './add-fornecedores.component.html',
  styleUrls: ['./add-fornecedores.component.scss']
})
export class AddFornecedoresComponent implements OnInit {

  fornecedorId!: number
  AddFornecedorForm!: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private FornecedorService: FornecedorService,
      private router: Router,
      private httpClient: HttpClient // Adicione esta linha
  ) { }

  ngOnInit(): void {
    this.AddFornecedorForm = this.formBuilder.group({
      cpfcnpj: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      // rg: ['', Validators.required],
      // dataNascimento: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required], // Campo Rua adicionado
      cidade: ['', Validators.required], // Campo Cidade adicionado
      bairro: ['', Validators.required], // Campo Bairro adicionado
      estado: ['', Validators.required] // Campo Estado adicionado
    });
  }

  buscarCEPViaApi() {
    const cepControl = this.AddFornecedorForm.get('cep');
    if (cepControl && cepControl.value && /^[0-9]{8}$/.test(cepControl.value)) {
        const cep = cepControl.value;
        this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`, { responseType: 'json' }).subscribe(
            (data: any) => {
                this.AddFornecedorForm.patchValue({
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



  submitAddFornecedor() {

    const dadosNovoFornecedor = this.AddFornecedorForm.getRawValue() as FornecedorViewModel;

    var Fornecedor = new FornecedorViewModel();
    Fornecedor.cpfcnpj = dadosNovoFornecedor.cpfcnpj;
    Fornecedor.nome = dadosNovoFornecedor.nome;
    Fornecedor.email = dadosNovoFornecedor.email;
    Fornecedor.cep = dadosNovoFornecedor.cep;
    // Fornecedor.rg = dadosNovoFornecedor.rg;
    // Fornecedor.dataNascimento = dadosNovoFornecedor.dataNascimento;

    this.FornecedorService.AdcionarFornecedor(Fornecedor)
      .subscribe(novoFornecedor  => {
        const novoFornecedorId = novoFornecedor.fornecedorId;

        this.enviarDadosCep(novoFornecedorId);
        this.router.navigate(["/fornecedor"]);
      },
        error => {
          alert("Erro!")
        })


  }

  enviarDadosCep(fornecedorId: number) {

    const dadosNovoCep = this.AddFornecedorForm.getRawValue() as CepViewModel;

    var Cep = new CepViewModel();
    Cep.cepId = dadosNovoCep.cepId;
    Cep.fornecedorId = fornecedorId;
    Cep.fornecedorId = dadosNovoCep.fornecedorId;
    Cep.rua = dadosNovoCep.rua;
    Cep.bairro = dadosNovoCep.bairro;
    Cep.cidade = dadosNovoCep.cidade;
    Cep.estado = dadosNovoCep.estado;

    this.FornecedorService.AdicionarCep(Cep)
      .subscribe(erro => {

        this.router.navigate(["/fornecedor"]);
      },
        error => {
          alert("Erro!")
        })


  }
  

}