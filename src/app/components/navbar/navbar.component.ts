import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticaService } from 'src/app/service/Autentica.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  CadastrarEmpresa = false;
  CadastrarFornecedor = false;

  constructor(private router: Router,
    private autenticaService: AutenticaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      this.CadastrarEmpresa = segments.some(segment => segment.path === 'empresas');
    });
    this.route.url.subscribe(segments => {
      this.CadastrarFornecedor = segments.some(segment => segment.path === 'fornecedor');
    });
  }

  AdcionarFornecedor() {
    this.router.navigate(["/AdcionarFornecedor"]);
  }

  AdcionarEmpresa() {
    this.router.navigate(["/AdcionarEmpresa"]);
  }

  voltar() {
    this.router.navigate(["/home"]);
  }

  sair() {
    this.autenticaService.LimparToken();
    this.router.navigate(["/login"]);
  }


}