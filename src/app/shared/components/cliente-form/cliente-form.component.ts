import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/pages/clientes/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  clienteForm!: FormGroup;
  activeID: string;

  title!: string;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private activedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activeID = this.activedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.initForm();
    if (this.activeID) {
      this.clienteService.buscarPorId(this.activeID).subscribe((res) => {
        this.clienteForm.patchValue(res);
        this.title = 'Editar cliente';
      });
    } else {
      this.title = 'Novo cliente';
    }
  }

  private initForm(): void {
    this.clienteForm = this.fb.group({
      id: [''],
      nome: ['', [Validators.required]],
      documento: [{value: '', disabled: !!this.activeID}, [Validators.required]],
      endereco: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      telefone: ['',
        [Validators.required, Validators.min(0)],
      ],
      numero: [
        '',
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  storage(): void {
    this.clienteForm.markAllAsTouched();
    this.clienteForm.valid
      ? this.activeID
        ? this.alterarCliente()
        : this.novoCliente()
      : this.formInvalido();
  }

  private alterarCliente(){
    this.clienteService
      .atualizar(this.activeID, this.clienteForm.value)
      .subscribe((res) => {
        Swal.fire(
          'Atualizado!',
          '',
          'success'
        ).then(() => {
          this.router.navigate(['/list']);
        });
      }, (error: any) => {

      });
  }

  private formInvalido() {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Formulário inválido',
    });
  }

  private novoCliente() {
    return this.clienteService
      .novoCliente(this.clienteForm.value)
      .subscribe((res) => {
        Swal.fire(
          'Cliente cadastrado com Sucesso!',
          
        ).then(() => {
          this.router.navigate(['/list']);
        });
      });
  }

  
   

  setNewCords(cords: any) {
    this.clienteForm.patchValue({ cidade: cords[0], cep: cords[1] });
  }
}
