import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Resumen } from './resumen';
import { ClienteState } from '../cliente-state';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ClienteInterface } from '../cliente.model';

describe('Resumen', () => {
  let component: Resumen;
  let fixture: ComponentFixture<Resumen>;
  let mockClienteState: jasmine.SpyObj<ClienteState>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockClienteState = jasmine.createSpyObj('ClienteState', ['getCliente', 'limpiarCliente']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [Resumen],
      providers: [
        { provide: ClienteState, useValue: mockClienteState },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Resumen);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería asignar cliente si existe', () => {
    const clienteMock: ClienteInterface = {
      tipo: 'DNI',
      numero: '12345678',
      nombres: 'Juan',
      apellidos: 'Pérez',
      correo: 'juan@mail.com'
    };
    mockClienteState.getCliente.and.returnValue(of(clienteMock));
    fixture.detectChanges();

    expect(component.cliente).toEqual(clienteMock);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('debería redirigir a /formulario si no hay cliente', () => {
    mockClienteState.getCliente.and.returnValue(of(null));
    fixture.detectChanges();

    expect(component.cliente).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/formulario']);
  });

  it('debería limpiar cliente y navegar al volver', () => {
    mockClienteState.limpiarCliente.and.stub();
    component.volver();
    expect(mockClienteState.limpiarCliente).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/formulario']);
  });
});
