import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadChildren: () =>
      import('./clientes/clientes-module').then(m => m.ClientesModule)
  }
];
