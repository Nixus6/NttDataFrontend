import { TestBed } from '@angular/core/testing';
import { Cliente } from './cliente';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteInterface } from './cliente.model';

describe('Cliente Service', () => {
  let service: Cliente;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Cliente]
    });
    service = TestBed.inject(Cliente);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener un cliente por tipo y número', () => {
    const mockCliente: ClienteInterface = {
      tipo: 'DNI',
      numero: '12345678',
      nombres: 'Juan',
      apellidos: 'Pérez',
      correo: 'juan@mail.com'
    };

    service.obtenerCliente('DNI', '12345678').subscribe(cliente => {
      expect(cliente).toEqual(mockCliente);
    });

    const req = httpMock.expectOne(
      r => r.method === 'GET' &&
           r.url === 'http://localhost:8090/clientes' &&
           r.params.get('tipo') === 'DNI' &&
           r.params.get('numero') === '12345678'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCliente);
  });
});
