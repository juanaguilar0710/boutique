import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'https://tu-api.com/pedidos';

  constructor(private http: HttpClient) {}

  buscarPorNumero(numeroPedido: string): Observable<Pedido[]> {
    // En una aplicación real, harías una llamada HTTP
    // return this.http.get<Pedido[]>(`${this.apiUrl}?numero=${numeroPedido}`);
    
    // Ejemplo con datos mock
    const mockPedidos: Pedido[] = [
      {
        id: parseInt(numeroPedido),
        cliente: 'Cliente Ejemplo',
        email: 'cliente@example.com',
        telefono: '88889999',
        fecha: new Date(),
        estado: 'pendiente',
        metodoPago: 'Sinpe',
        monto: 25000,
        tipoRetiro: 'Retiro en tienda'
      }
    ];
    return of(mockPedidos.filter(p => p.id === parseInt(numeroPedido)));
  }

  buscarPorCliente(email: string, telefono: string): Observable<Pedido[]> {
    // En una aplicación real:
    // return this.http.get<Pedido[]>(`${this.apiUrl}?email=${email}&telefono=${telefono}`);
    
    // Ejemplo con datos mock
    const mockPedidos: Pedido[] = [
      {
        id: 1001,
        cliente: 'Cliente Ejemplo',
        email: email,
        telefono: telefono,
        fecha: new Date('2025-05-01'),
        estado: 'completado',
        metodoPago: 'Sinpe',
        monto: 25000,
        tipoRetiro: 'Retiro en tienda'
      },
      {
        id: 1002,
        cliente: 'Cliente Ejemplo',
        email: email,
        telefono: telefono,
        fecha: new Date('2025-05-10'),
        estado: 'proceso',
        metodoPago: 'Transferencia',
        monto: 35000,
        tipoRetiro: 'Envío Correos CR'
      }
    ];
    
    return of(mockPedidos.filter(p => 
      (email && p.email.includes(email)) || 
      (telefono && p.telefono.includes(telefono)))
    );
  }
}