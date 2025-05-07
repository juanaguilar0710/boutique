import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PedidoDetalleComponent } from '../lista-pedidos/pedido-detalle.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditarPedidoDialogComponent } from '../editar-pedido-dialog.component.ts/editar-pedido-dialog.component.ts.component';

export interface Pedido {
  id: number;
  cliente: string;
  email: string;
  telefono: string;
  fecha: Date;
  estado: 'pendiente' | 'proceso' | 'completado' | 'cancelado';
  metodoPago: string;
  monto: number;
  tipoRetiro: string;
}

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent {
  displayedColumns: string[] = ['id', 'cliente', 'fecha', 'monto', 'estado', 'acciones'];
  dataSource: Pedido[] = [
    {
      id: 1,
      cliente: 'Juan Pérez',
      email: 'juan@example.com',
      telefono: '88889999',
      fecha: new Date('2025-05-01'),
      estado: 'completado',
      metodoPago: 'Sinpe',
      monto: 25000,
      tipoRetiro: 'Retiro en tienda'
    },
    {
      id: 2,
      cliente: 'María Rodríguez',
      email: 'maria@example.com',
      telefono: '87776655',
      fecha: new Date('2025-05-03'),
      estado: 'proceso',
      metodoPago: 'Transferencia',
      monto: 35000,
      tipoRetiro: 'Envío Correos CR'
    },
    {
      id: 3,
      cliente: 'Carlos Sánchez',
      email: 'carlos@example.com',
      telefono: '86665544',
      fecha: new Date('2025-05-05'),
      estado: 'pendiente',
      metodoPago: 'Sinpe',
      monto: 18000,
      tipoRetiro: 'Retiro en tienda'
    }
  ];

  constructor(private dialog: MatDialog) {}

  verDetalle(pedido: Pedido): void {
    this.dialog.open(PedidoDetalleComponent, {
      width: '600px',
      data: pedido
    });
  }

  cambiarEstado(pedido: Pedido, nuevoEstado: string): void {
    pedido.estado = nuevoEstado as any;
    // Aquí normalmente harías una llamada HTTP para actualizar en el servidor
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'pendiente': return 'primary';
      case 'proceso': return 'accent';
      case 'completado': return 'warn';
      case 'cancelado': return '';
      default: return '';
    }
  }

  editarPedido(pedido: any) {
    const dialogRef = this.dialog.open(EditarPedidoDialogComponent, {
      width: '800px',
      data: pedido // Pasamos los datos del pedido a editar
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualizar la lista después de editar
        window.alert('Pedido actualizado correctamente');
      }
    });
  }
}