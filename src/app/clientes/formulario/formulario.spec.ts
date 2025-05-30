import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formulario } from './formulario';
import { Cliente } from '../cliente';
import { ClienteState } from '../cliente-state';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('Formulario', () => {
  let component: Formulario;
  let fixture: ComponentFixture<Formulario>;
  let mockCliente: jasmine.SpyObj<Cliente>;
  let mockClienteState: jasmine.SpyObj<ClienteState>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockCliente = jasmine.createSpyObj('Cliente', ['obtenerCliente']);
    mockClienteState = jasmine.createSpyObj('ClienteState', ['setCliente']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [Formulario],
      providers: [
        { provide: Cliente, useValue: mockCliente },
        { provide: ClienteState, useValue: mockClienteState },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el formulario inválido por defecto', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('debería marcar submitted en true al enviar', () => {
    component.form.setValue({ tipo: '', numero: '' });
    component.onSubmit();
    expect(component.submitted).toBeTrue();
  });

  it('no debería llamar a obtenerCliente si el formulario es inválido', () => {
    component.form.setValue({ tipo: '', numero: '' });
    component.onSubmit();
    expect(mockCliente.obtenerCliente).not.toHaveBeenCalled();
  });

  it('debería navegar a /resumen si el cliente es encontrado', () => {
    component.form.setValue({ tipo: 'DNI', numero: '12345678' });
    const clienteMock = { tipo: 'DNI', numero: '12345678', nombres: 'Juan', apellidos: 'Pérez', correo: 'juan@mail.com' };
    mockCliente.obtenerCliente.and.returnValue(of(clienteMock));

    component.onSubmit();

    expect(mockCliente.obtenerCliente).toHaveBeenCalledWith('DNI', '12345678');
    expect(mockClienteState.setCliente).toHaveBeenCalledWith(clienteMock);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/resumen']);
    expect(component.error).toBe('');
  });

  it('debería mostrar error si el cliente no es encontrado', () => {
    component.form.setValue({ tipo: 'DNI', numero: '12345678' });
    mockCliente.obtenerCliente.and.returnValue(throwError(() => new Error('No encontrado')));

    component.onSubmit();

    expect(component.error).toBe('Cliente no encontrado.');
  });
});
