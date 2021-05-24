import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClienteService } from '../cliente.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  clientes!: Cliente[];

  constructor(
    private router: Router,
    private customerService: ClienteService
  ) {}

  ngOnInit(): void {
    this.buscar();
  }



  destroy(id: any, ativo:boolean): void {
    Swal.fire({
      title: ativo ? 'Deseja inativar?': 'Deseja ativar?', 
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.alterarStatus(id).subscribe((res) => {
          Swal.fire(
            ativo ? 'Cliente Inativado': 'Cliente Ativado',
            '',
            'success'
          ).then(() => {
            this.buscar();
          });
        });
      }
    });
  }

  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.clientes);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Lista de Clientes.xlsx');
  }
  buscar($event:any = ''){
    this.customerService
    .buscarTodos($event.target?.value)
    .subscribe((res) => (this.clientes = <any>res));

  }

}
