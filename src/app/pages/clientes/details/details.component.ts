import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClienteService } from '../cliente.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  cliente!: Cliente;
  userId: string;
  clientes!: Cliente[];

  constructor(
    private customerService: ClienteService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.userId = this.activedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.customerService.buscarPorId(this.userId)
      .subscribe(res=>{this.cliente = res})
      
  }


  destroy(id: any): void {
    Swal.fire({
      title: 'Deseja inativar?',
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
          Swal.fire('¡Eliminado!', '', 'success');
          this.router.navigate(['/list']);
        });
      }
    });
  }

  exportPDF() {
    var data = document.getElementById('card-details')!;
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf');
    });
  }
}
