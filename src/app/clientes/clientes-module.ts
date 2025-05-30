import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { Formulario } from './formulario/formulario';
import { Resumen } from './resumen/resumen';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    Formulario,
    Resumen
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
