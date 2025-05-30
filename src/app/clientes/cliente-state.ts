import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from './cliente';
import { ClienteInterface } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteState {

  private clienteSubject = new BehaviorSubject<ClienteInterface | null>(null);

  setCliente(cliente: ClienteInterface): void {
    this.clienteSubject.next(cliente);
  }

  getCliente(): Observable<ClienteInterface | null> {
    return this.clienteSubject.asObservable();
  }

  limpiarCliente(): void {
    this.clienteSubject.next(null);
  }
}
