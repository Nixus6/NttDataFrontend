import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../cliente';
import { Router } from '@angular/router';
import { ClienteState } from '../cliente-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
  standalone: false
})
export class Formulario {

  form: FormGroup;
  submitted = false;
  error = '';

constructor(private fb: FormBuilder,
      private clienteService: Cliente,
      private clienteState: ClienteState,
      private router: Router
) {
  this.form = this.fb.group({
  tipo: ['', Validators.required],
  numero: ['', [
    Validators.required,
    Validators.pattern(/^\d+$/),
    Validators.minLength(8),
    Validators.maxLength(11)
  ]]
});
}

  get tipo() { return this.form.get('tipo')!; }
  get numero() { return this.form.get('numero')!; }

onSubmit(): void {

      this.submitted = true;
      this.error = '';

      // Si el formulario es inválido, no hacemos nada
      if (this.form.invalid) return;

      const { tipo, numero } = this.form.value;

      this.clienteService.obtenerCliente(tipo!, numero!).subscribe({
      next: (cliente) => {
        this.clienteState.setCliente(cliente);
        this.router.navigate(['/resumen']);
      },
      error: () => {
        this.error = 'Cliente no encontrado.';
      }
    });
}
}
