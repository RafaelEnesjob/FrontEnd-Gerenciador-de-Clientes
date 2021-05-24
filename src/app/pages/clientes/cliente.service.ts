import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  buscarTodos(nome: string='') {
    let httpParams = new HttpParams();
    if (nome){
     httpParams =  httpParams.append("nome", nome);

    }
    return this.http.get(`${environment.api_url}/cliente`,{params: httpParams});
  }

  novoCliente(cliente: Cliente) {
    return this.http.post(`${environment.api_url}/cliente`, cliente);
  }

  buscarPorId(id: string) {
    return this.http.get<Cliente>(`${environment.api_url}/cliente/${id}`);
  }

  atualizar(id: string, cliente: Cliente) {
    return this.http.put(`${environment.api_url}/cliente/${id}`, cliente)
  }

  alterarStatus(id: string) {
    return this.http.patch(`${environment.api_url}/cliente/${id}`,id);
  }
}
