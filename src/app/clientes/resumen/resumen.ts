import { Component } from '@angular/core';
import { ClienteState } from '../cliente-state';
import { Router } from '@angular/router';
import { ClienteInterface } from '../cliente.model';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.html',
  styleUrl: './resumen.scss',
  standalone: false
})
export class Resumen {

  cliente: ClienteInterface | null = null;

  constructor(
    private clienteState: ClienteState,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteState.getCliente().subscribe(cliente => {
      if (!cliente) {
        this.router.navigate(['/formulario']);
      } else {
        this.cliente = cliente;
      }
    });
  }

  volver(): void {
    this.clienteState.limpiarCliente();
    this.router.navigate(['/formulario']);
  }

}
