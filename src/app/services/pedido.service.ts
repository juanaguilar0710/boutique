import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { DocumentoPedido, Pedido } from '../models/pedido.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  crearPedido(pedido: any): Observable<any> {  
    return this.http.post(this.baseUrl + environment.Pedidos, pedido);
  }

  obtenerPedidos() {
    return this.http.get(this.baseUrl + environment.Pedidos);
  }

  buscarPorCodigoSeguimiento(codigo: string): Observable<any> {
    return this.http.get(this.baseUrl + environment.Pedidos + '/' + environment.porcodigo + codigo);  
  }

  buscarPorNumeroGuia(guia: string): Observable<any> {
    return this.http.get(this.baseUrl + environment.Pedidos + '/' + environment.porguia + guia);  
  }

  buscarPorCliente(email: string, telefono: string): Observable<Pedido[]> {
    // Construir parámetros de consulta
    let params = new HttpParams();
    
    if (email) {
      params = params.append('email', email);
    }
    
    if (telefono) {
      params = params.append('telefono', telefono);
    }
  
    return this.http.get<Pedido[]>(this.baseUrl + environment.Pedidos +'/'+ environment.porcliente, { params }).pipe(
      catchError(error => {
        console.error('Error buscando pedidos por cliente:', error);
        return of([]); // Devuelve array vacío en caso de error
      })
    );
  }

  obtenerPedidoConDocumentos(pedidoId: number): Observable<{ pedido: Pedido, documentos: DocumentoPedido[] }> {
    return this.http.get<{ pedido: Pedido, documentos: DocumentoPedido[] }>(this.baseUrl + ''+ environment.Pedidos +'/' +pedidoId + '/' + environment.condocumentos,{ 
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }),
      responseType: 'json'
    }).pipe(
      retry(1), // Reintentar una vez
      catchError(this.handleError)
    );
  }
  
  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(() => new Error(
      error.error?.message || error.message || 'Error en el servidor'
    ));
  }
  
  // Métodos para Documentos
  subirComprobante(pedidoId: number, archivo: File) {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post(this.baseUrl + environment.documentos +'/' + environment.subircomprobante +'/'+ pedidoId, formData);
  }

  descargarDocumento(documentoId: number) {
    return this.http.get(this.baseUrl + environment.documentos +'/'+ environment.descargar + '/' + documentoId, {
      responseType: 'blob'
    });
  }

  actualizarGuia(pedidoId: number, numeroGuia: string) {
    return this.http.put(this.baseUrl + environment.documentos +'/'+ environment.actualizarguia + '/' + pedidoId, { numeroGuia });
  }

  actualizarFactura(pedidoId: number, numeroFactura: string) {
    return this.http.put(this.baseUrl + environment.documentos + '/' + environment.actualizarfactura +'/' + pedidoId, { numeroFactura });
  }
  
}