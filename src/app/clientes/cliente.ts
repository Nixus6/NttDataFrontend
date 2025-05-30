import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteInterface } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class Cliente {

  private baseUrl = 'https://backend-service-376671081583.us-central1.run.app/clientes';

  constructor(private http: HttpClient) {}

  obtenerCliente(tipo: string, numero: string): Observable<ClienteInterface> {
    const params = new HttpParams()
      .set('tipo', tipo)
      .set('numero', numero);

    return this.http.get<ClienteInterface>(this.baseUrl, { params });
  }
}
