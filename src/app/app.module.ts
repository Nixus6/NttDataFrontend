import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { ClientesModule } from './clientes/clientes-module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    ClientesModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [App]
})
export class AppModule {}