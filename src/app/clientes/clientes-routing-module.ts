import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Formulario } from './formulario/formulario';
import { Resumen } from './resumen/resumen';

const routes: Routes = [
  { path: 'formulario', component: Formulario },
  { path: 'resumen', component: Resumen },
  { path: '', redirectTo: 'formulario', pathMatch: 'full' },
  { path: '**', redirectTo: 'formulario' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
